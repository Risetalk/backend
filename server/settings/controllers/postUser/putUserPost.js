const Post = require("../../../../database/models/post.model")
const putUserPost = async (req,res) =>{
    try {
        //the id is obtained by params
        const {postId} = req.params;
        

         //it is checked that the entered id is of type uuid
        if(postId.length !== 36 || !postId.includes("-")) return res.status(412).json({message: `The syntax '${postId}' is not valid, you must enter a valid uuid, an exemple '2d9af42a-22fa-4a38-ab67-adbf1ce07642'`})
        
        //the necessary fields to be modified are obtained
        const {title, description, background_image} = req.body

        //Search for the post you want to modify by passing the id
        const onePost = await Post.findByPk(postId)

        //if any parameter exists, the post is modified and saved in the database
        if(title) onePost.title = title
        if(description) onePost.description = description
        if(background_image) onePost.background_image = background_image
        await onePost.save()

        res.status(200).json(onePost)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

module.exports = putUserPost;