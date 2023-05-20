// Third Party Dependencies.
const { Router } = require("express");


// Local Dependencies.
const postLesson = require("../controllers/lesson/postLesson.controler");
const allLesson = require("../controllers/lesson/getAllLesson.controller");
const lessonById = require("../controllers/lesson/getOneLesson.controller");

// Router Instance.
const routesLesson = Router();

// Post Course Route.
routesLesson.post("/", postLesson);

// Get All Courses.
routesLesson.get("/", allLesson);

// Get Course By Id
routesLesson.get("/:id", lessonById)



module.exports = routesLesson;
