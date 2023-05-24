const Post_comment = require("../../../../database/models/postComment.model");
const Post = require("../../../../database/models/post.model");
const cloudinary = require("../../cloudinaryConfig")

const deleteUserPost = async (req, res) => {
  try {
   

    const { postId } = req.params;

    if (postId.length !== 36 || !postId.includes("-")) {
      return res.status(412).json({
        message: `The syntax '${postId}' is not valid. You must enter a valid UUID. For example, '2d9af42a-22fa-4a38-ab67-adbf1ce07642'.`
      });
    }

    const onePost = await Post.findByPk(postId);

    if (!onePost) {
      throw new Error("The post does not exist.");
    }

    let url = onePost.dataValues.background_image;
    let id = "uploads/" + url.split("/").at(-1).split(".")[0];
    console.log(id);

    cloudinary.uploader.destroy(id, (error, result) => {
      if (error) {
        console.error('Error al eliminar la imagen:', error);
        return res.status(500).json({ message: 'Error deleting the image.' });
      }

      console.log('La imagen se ha eliminado correctamente:', result);

      Post_comment.destroy({
        where: {
          postId: postId
        }
      })
        .then(() => {
          return onePost.destroy();
        })
        .then(() => {
          res.status(200).json({
            status: 200,
            message: "The post was successfully deleted."
          });
        })
        .catch((error) => {
          console.error('Error al eliminar el post:', error);
          res.status(500).json({ message: 'Error deleting the post.' });
        });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteUserPost;

