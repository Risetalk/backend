const User = require("../../../../database/models/user.model");
const Post = require("../../../../database/models/post.model");
const path = require("path");
const cloudinary = require("../../cloudinaryConfig")
const fs = require("fs");

const unlinkFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

const userPostToPost = async (req, res) => {
  let modification;
  try {
    

    const original = path.join(__dirname, "../../../statics/img/", req.file.filename);
    modification = path.join(__dirname, "../../../statics/img/", req.file.filename + ".jpg");

    fs.rename(original, modification, (error) => {
      if (error) {
        console.error('Error al renombrar la imagen:', error);
      } else {
        console.log('Imagen renombrada exitosamente.');
      }
    });

    await cloudinary.uploader.upload(modification, { folder: "uploads" }, async (error, result) => {
      if (error) {
        console.error('Error al subir la imagen a Cloudinary:', error);
        await unlinkFile(modification);
        return res.status(500).json({ message: 'Error uploading image to Cloudinary' });
      }

      const { userId } = req.params;

      if (userId.length !== 36 || !userId.includes("-")) {
        await unlinkFile(modification);
        return res.status(412).json({
          message: `The syntax '${userId}' is not valid, you must enter a valid uuid, for example '2d9af42a-22fa-4a38-ab67-adbf1ce07642'`
        });
      }

      const { title, description } = req.body;

      if (!title || !description) {
        await unlinkFile(modification);
        return res.status(412).json({ message: "You must send the requested fields" });
      }

      const userById = await User.findByPk(userId);
      if (!userById) {
        await unlinkFile(modification);
        throw new Error("Can't find a user with that id");
      }

      const createPost = await Post.create({
        title,
        description,
        background_image: result.secure_url,
        userId
      });

      await unlinkFile(modification);
      return res.status(201).json(createPost)
     
      
    });
  } catch (error) {
    console.error('Ocurrió un error:', error);
    await unlinkFile(modification);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = userPostToPost;
