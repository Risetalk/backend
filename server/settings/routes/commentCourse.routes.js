// Third Party Dependencies.
const { Router } = require("express");

// Local Dependencies.
const postCommentCourses=require("../controllers/commentCourse/postCommentCourses.controller")
const getAllCommentcourseById=require("../controllers/commentCourse/getAllCommentcourseById.controller");

// Router Instance.
const commentCourseRoutes = Router();

// Post CommentCourse Route.
commentCourseRoutes.post("/", postCommentCourses);

// Get CommentCourse By Id
commentCourseRoutes.get("/", getAllCommentcourseById)


module.exports = commentCourseRoutes;
