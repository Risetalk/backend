const Post_comment = require("../../../../database/models/postComment.model");
const Post = require("../../../../database/models/post.model");
const cloudinary = require("../../cloudinaryConfig")

const deleteUserPost = async (req, res) => {
  try {
   
    //the id is searched for body.params
    const { postId } = req.params;

    //We check that the id is uuid
    if (postId.length !== 36 || !postId.includes("-")) {
      return res.status(412).json({
        message: `The syntax '${postId}' is not valid. You must enter a valid UUID. For example, '2d9af42a-22fa-4a38-ab67-adbf1ce07642'.`
      });
    }

    //The post corresponding to your id is searched for
    const onePost = await Post.findByPk(postId);

    //If the post does not exist, it throws an error
    if (!onePost) {
      throw new Error("The post does not exist.");
    }

    //Al extracts the id from the background image url 
    let searchImage;
    let url = onePost.dataValues.background_image;
    let id = "uploads/" + url.split("/").at(-1).split(".")[0];
    
    //It is searched if this id exists in cloudinary
    cloudinary.search
    .expression(`public_id:${id}`)
    .execute()

    //In the case that the image is found, it is stored in a variable

    .then(result => {
        searchImage = result;
    })

    //In case there is an error, I get a console.log with the error.
    .catch(error => {
      console.error('Error when searching for the image in cloudinary:', error);
    });

    //It is checked if the image searched for in cloudinary exists
    if(searchImage){
    
    //The respective cloudinary image is deleted
    cloudinary.uploader.destroy(id, (error, result) => {

      //If there is an error, reply with error
      if (error) {
        console.error('Error deleting the image in cloudinary:', error);
        return res.status(500).json({ message: 'Error deleting the image.' });
      }

      //If all goes well, send a console.log with the result.
      else{
        console.log('The image has been successfully removed from cloudinary:', result);
      }
    });
  }

      //And finally that the post with its respective post_comment be deleted.
      Post_comment.destroy({
        where: {
          postId: postId
        }
      })
        .then(() => {
          return onePost.destroy();
        })

        //If the deletion was successful it will send "The post was successfully deleted."
        .then(() => {
          res.status(200).json({
            status: 200,
            message: "The post was successfully deleted."
          });
        })

        //In the event of an error that responds with status 500 and the respective message
        .catch((error) => {
            return res.status(500).json({ message: `Error deleting the post: ${error}` });
        });
    
  } catch (error) {

    res.status(500).json({ message: error.message });
    
  }
};

module.exports = deleteUserPost;

