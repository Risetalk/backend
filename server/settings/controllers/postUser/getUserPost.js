const User = require("../../../../database/models/user.model")
const Post = require("../../../../database/models/post.model")
const Post_comment = require("../../../../database/models/postComment.model");

const getUserPost = async (req,res)=>{
    try {
        //The user, post and comment_post with their respective relationships are obtained in the constant
        const allPost = await User.findAll({
            include: {
              model: Post,
              attributes: ["id", "title", "description", "background_image"], 
               include:[
                {
                    model: Post_comment,
                    attributes: ["comment"],
                    include: [
                        {
                            model: User,
                            attributes: ["id","first_name", "last_name", "profile_picture", "email"]
                        }
                    ]
                }
               ]
            },
            attributes: ["id","first_name", "last_name", "profile_picture", "email"]
          });
          //Mapped to display the data as requested
          let allDivPost = [];
          allPost.map((pos)=>{
            pos.dataValues.posts.map((val) =>{
               
                allDivPost = [...allDivPost, {
                    id: pos.dataValues.id,
                    first_name: pos.dataValues.first_name,
                     last_name: pos.dataValues.last_name,
                     profile_picture: pos.dataValues.profile_picture,
                     email: pos.dataValues.email,
                      post: val.dataValues}]
            })
           
          })
        //If everything was successfully executed, the following data is returned
        res.status(200).json(allDivPost)

    } catch (error) {

        res.status(404).json({message: error.message})
    }
}

module.exports = getUserPost;