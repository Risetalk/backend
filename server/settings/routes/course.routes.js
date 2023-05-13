// Third Party Dependencies.
const { Router } = require("express");

// Local Dependencies.
const postCourses = require("../controllers/course/course.controllers");

// Router Instance.
const routesCourse = Router();

// Post Course Route.
routesCourse.post("/", postCourses);

module.exports = routesCourse;
