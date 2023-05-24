// Third Party Dependencies.
const { Router } = require("express");
const postToPostController = require("../controllers/postUser/userPostToPost")
const getUserPost = require("../controllers/postUser/getUserPost")
const putUserPost = require("../controllers/postUser/putUserPost")
const deleteUserPost = require("../controllers/postUser/deleteUserPost")
// Router Instance.
const postRoutes = Router();

// Routing to postToPostController handler
postRoutes.post("/:userId", postToPostController)

// Routing to getUserPost handler
postRoutes.get("/", getUserPost)

//Routing to putUserPost handler
postRoutes.put("/:postId", putUserPost)

//Routing to deleteUserPost handler
postRoutes.delete("/:postId", deleteUserPost)

module.exports = postRoutes;
