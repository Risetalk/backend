// Third Party Dependencies.
const { Router } = require("express");
const allCourses = require("../controllers/course/allCourses.controller");

// Local Dependencies.
const courseById = require("../controllers/course/courseById.controller")
const courseByName = require("../controllers/course/courseByName.controller");
const postCourse = require("../controllers/course/postCourse.controller");

// Router Instance.
const routesCourse = Router();

// Post Course Route.
routesCourse.post("/", postCourse);


// Get Course By Id
routesCourse.get("/:id", courseById)


// Get Course By Name And Get All Courses
routesCourse.get("/name", courseByName)

// Get All Courses.
routesCourse.get("/", allCourses);


module.exports = routesCourse;
