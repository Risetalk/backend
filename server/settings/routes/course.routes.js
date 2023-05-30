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
/**
 * @openapi
 * paths:
 *   /courses/{title}:
 *    get:
 *     tags: [Courses]
 *     summary: Search a Course by Name.
 *     description: > 
 *       **This route will search a course by name.**
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          
 * 
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             
 * 
*/

// Get All Courses.
routesCourse.get("/", allCourses);


module.exports = routesCourse;
