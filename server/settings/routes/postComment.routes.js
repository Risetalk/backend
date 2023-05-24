const {Router} = require("express")

const postToPostComment = require("../controllers/postComment/postToPostComment")
const deletePostComment = require("../controllers/postComment/deletePostComment")
const putPostComment = require("../controllers/postComment/putPostComment")
const postComment = Router()

// Routing to postToPostComment handler
postComment.post("/", postToPostComment)

// Routing to deletePostComment handler
postComment.delete("/:postCommentId", deletePostComment)

// Routing to putPostComment handler
postComment.put("/:postCommentId", putPostComment)

module.exports = postComment;