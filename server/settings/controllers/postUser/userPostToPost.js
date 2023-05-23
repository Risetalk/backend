const User = require("../../../../database/models/user.model")
const Post = require("../../../../database/models/post.model")


const fs = require("fs")
const userPostToPost = async (req,res)=>{

try {
    console.log(req.file.filename);
    const original = "../../../statics/img" + req.file.filename;
    const modification = req.file.filename + ".jpg";
    fs.rename(original, modification, (error) => {
        if (error) {
          console.error('Error al renombrar la imagen:', error);
        } else {
          console.log('Imagen renombrada exitosamente.');
        }
      });
    //search for id by params
    let {userId} = req.params;

    //it is checked that the entered id is of type uuid
    if(userId.length !== 36 || !userId.includes("-")) return res.status(412).json({message: `The syntax '${userId}' is not valid, you must enter a valid uuid, an exemple '2d9af42a-22fa-4a38-ab67-adbf1ce07642'`})

    //data is obtained by req. body
    const {title, description} = req.body

    //the data entered are verified to exist
    if(!title || !description ) return res.status(412).json({message: "You must send the requested fields"})

    
    //the user is stored in a constant, in case the requested user is not found, an error is thrown
    const userById = await User.findByPk(userId)
    if(!userById) throw new Error("Can't find a user with that id") 

    //The post is created with the required data
    const createPost = await Post.create({
        title,
        description,
        
        userId
    })

    //If everything is successful, we will reply with the created post.
    res.status(201).json(createPost)

} catch (error) {

    //In case there has been an error, the corresponding error will be answered. 
    res.status(404).json({message: error.message})

}
    
}

module.exports = userPostToPost;