const Post_comment = require("../../../../database/models/postComment.model")
const deletePostComment = async (req,res) =>{
    try {

        //the id is obtained by req.params
        const {postCommentId} = req.params;
        
        //Check that the syntax is correct
        if(postCommentId.length !== 36 || !postCommentId.includes("-")) return res.status(412).json({message: `The syntax '${postCommentId}' is not valid, you must enter a valid uuid, an exemple '2d9af42a-22fa-4a38-ab67-adbf1ce07642'`})
        
        //The id corresponding to the post_comment is searched
        const onePostComment = await Post_comment.findByPk(postCommentId)

        //If there is no post_comment with that id, it will throw an error
        if(!onePostComment) throw new Error("the post with that id does not exist")

        //the comment is deleted
        onePostComment.destroy()

        //a code 200 is sent if everything has been done correctly.
        res.status(200).send({
            status:200,
            message:"the post_comment was successfully deleted"
        })
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

module.exports = deletePostComment;