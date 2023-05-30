const Post_comment = require("../../../../database/models/postComment.model")
const putPostComment = async(req,res)=>{
    try {
        //the id is obtained by req.params
        const {postCommentId} = req.params;

        //Check that the syntax is correct
        if(postCommentId.length !== 36 || !postCommentId.includes("-")) return res.status(412).json({message: `The syntax '${postCommentId}' is not valid, you must enter a valid uuid, an exemple '2d9af42a-22fa-4a38-ab67-adbf1ce07642'`})
        
        //the data requested by body
        const {comment} = req.body;

        if(!comment) return res.status(400).json({message: "you must correctly submit comment per body, probably did not receive the required comment to process the request"})
        //The id corresponding to the post_comment is searched
        const onePostComment = await Post_comment.findByPk(postCommentId)

        //If there is no post_comment with that id, it will throw an error
        if(!onePostComment) throw new Error("the post with that id does not exist")

        //post_comment comment is modified
        onePostComment.comment = comment;

        //the modification is saved
        await onePostComment.save()
        
        
        //a status 201 is triggered in case everything was done correctly
        res.status(200).send("The modification was successful")
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}
module.exports = putPostComment;