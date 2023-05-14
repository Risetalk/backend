// Third Party Dependencies.
const { Router } = require("express");

// Local Dependencies.
const postCourses = require("../controllers/course/course.controllers");
const courseById = require("../controllers/course/courseById.controller")
const courseByName = require("../controllers/course/courseByName.controller")
// Router Instance.
const routesCourse = Router();

// Post Course Route.
routesCourse.post("/", postCourses);

// Get Course By Id
routesCourse.get("/:id", courseById)

// Get Course By Name And Get All Courses
routesCourse.get("/", courseByName)

module.exports = routesCourse;
