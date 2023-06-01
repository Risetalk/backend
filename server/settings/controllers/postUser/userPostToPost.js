const User = require("../../../../database/models/user.model");
const Post = require("../../../../database/models/post.model");
const path = require("path");
const cloudinary = require("../../cloudinaryConfig")
const fs = require("fs");

//A promise-based function is created
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

  //Some necessary variables are declared
  let modification;
  let original;
  let fileExist = false;
  
  //Some constants are required by req.body
  const { title, description, background_image } = req.body;

    
    
  
  if(req.file) fileExist = true;
  try {
    
    //In case the file sent exists
    if(fileExist){

      // The original file name of the file sent is searched for and modified in a variable
      original = path.join(__dirname, "../../../statics/img/", req.file.filename);
      modification = path.join(__dirname, "../../../statics/img/", req.file.filename + ".jpg");

    //The searched image is renamed
    fs.rename(original, modification, (error) => {
      if (error) {
        console.error('Error al renombrar la imagen:', error);
      } else {
        console.log('Imagen renombrada exitosamente.');
      }
    });
  }

  //The user who created the course is obtained by body.params
    const { userId } = req.params;
    
  //Validates that the id has a resemblance to uuid
    if (userId.length !== 36 || !userId.includes("-")) {
      await unlinkFile(modification);
      return res.status(412).json({
        message: `The syntax '${userId}' is not valid, you must enter a valid uuid, for example '2d9af42a-22fa-4a38-ab67-adbf1ce07642'`
      });
    }

    //Verification is made that the following constants exist
    if (!title || !description || !background_image && !req.file) {
      if(req.file) await unlinkFile(modification);
       return res.status(412).json({ message: "You must send the requested fields" });
     }

     //The user is searched by Id
     const userById = await User.findByPk(userId);

     //If it does not exist, an error is thrown
     if (!userById) {
        throw new Error("Can't find a user with that id");
     }

     //If the file is sent by body.file, the following code is executed
    if(fileExist){

      //Upload the file to cloudinary
    await cloudinary.uploader.upload(modification, { folder: "uploads" }, async (error, result) => {
      if (error) {

        //In case of error
        console.error('Error al subir la imagen a Cloudinary:', error);
        await unlinkFile(modification);
        return res.status(500).json({ message: 'Error uploading image to Cloudinary' });
      }

      //Post created with secure_url sent by cloudinary
        const createPost = await Post.create({
        title,
        description,
        background_image: result.secure_url,
        userId
      });

      //The file saved by Multer on the server is deleted.
      await unlinkFile(modification);
      return res.status(201).json(createPost)
          
    });
    }else{

      //In case the body.file does not exist, it is created with url of type string
      const createPost = await Post.create({
        title,
        description,
        background_image,
        userId
      });

      //If the creation was successful, a status 201 is sent.
      return res.status(201).json(createPost)
    }
    } catch (error) {
      console.error('Ocurrió un error:', error);
      await unlinkFile(modification);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

module.exports = userPostToPost;
