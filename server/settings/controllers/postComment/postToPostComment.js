const post_comment = require("../../../../database/models/postComment.model")
const postToPostComment = async (req,res)=>{
    try {
        //the data requested by body
        const {comment, userId, postId} = req.body;

        //it is verified that this data exists
        if(!comment || !userId || !postId) return res.status(400).json({message: "some or all of the data sent by body does not exist. "})

        //it is checked that the entered id is of type uuid
        if(userId.length !== 36 || !userId.includes("-")) return res.status(412).json({message: `The syntax '${userId}' is not valid, you must enter a valid uuid, an exemple '2d9af42a-22fa-4a38-ab67-adbf1ce07642'`})
        if(postId.length !== 36 || !postId.includes("-")) return res.status(412).json({message: `The syntax '${postId}' is not valid, you must enter a valid uuid, an exemple '2d9af42a-22fa-4a38-ab67-adbf1ce07642'`})
       
       //is stored in a constant and the requested postComment is created.
        const postComment = await post_comment.create({
            comment,
            userId,
            postId
        })

        //In the event that the postComment could not be created, it throws an error.
        if(!postComment) throw new Error("It was not possible to create a comment")


        //If everything was done correctly, you should respond with the requested postComment.
        res.status(200).json(postComment)

    } catch (error) {
        
        res.status(404).json({message: error.message})
    }
}

module.exports = postToPostComment;