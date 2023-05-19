const Post_comment = require("../../../../database/models/postComment.model")
const Post = require("../../../../database/models/post.model")
const deleteUserPost = async (req,res)=>{
    try {
        //you get the id
        const {postId} = req.params;

        //it is checked that the entered id is of type uuid
        if(postId.length !== 36 || !postId.includes("-")) return res.status(412).json({message: `The syntax '${postId}' is not valid, you must enter a valid uuid, an exemple '2d9af42a-22fa-4a38-ab67-adbf1ce07642'`})

        //the post is searched by id
        const onePost = await Post.findByPk(postId)

        //check if the post was found by id
        if(!onePost) throw new Error("the post does not exist")

        //the post_comment associated with the post id is removed
        await Post_comment.destroy({
            where:{
                postId: postId
            }
        })

        //the searched post is deleted by id
        await onePost.destroy()
        
        //if everything was executed correctly, status 204 is triggered
        res.status(200).send({
            status:200,
            message:"the post was successfully deleted"
        })
    } catch (error) {

        res.status(500).json({message: error.message})
    }
}
module.exports = deleteUserPost;