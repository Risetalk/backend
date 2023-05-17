// Third Party Dependencies.
const { Router } = require("express");
const allCourses = require("../controllers/course/allCourses.controller");

// Local Dependencies.
const postCourses = require("../controllers/course/course.controllers");
const courseById = require("../controllers/course/courseById.controller")
const courseByName = require("../controllers/course/courseByName.controller")
// Router Instance.
const routesCourse = Router();

// Post Course Route.
routesCourse.post("/", postCourses);
/**
 * @openapi
 * paths:
 *   /courses:
 *    post:
 *     tags: [Courses]
 *     summary: Create a new Course in the database.
 *     description: > 
 *       **This route will create a new course in the database.**
 *     parameters:
 *       - in: query
 *         name: id
 *         type: string
 *         required: true
 *         description: Id del usuario que desea crear el curso.
 * 
 * 
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CoursePost'
 * 
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 * 
*/

// Get All Courses.
routesCourse.get("/", allCourses);
/**
 * @openapi
 * paths:
 *   /courses:
 *    get:
 *     tags: [Courses]
 *     summary: Search All Courses.
 *     description: > 
 *       **This route will search all courses.**
 * 
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseAllResponse'
 * 
*/

// Get Course By Id
routesCourse.get("/:id", courseById)
/**
 * @openapi
 * paths:
 *   /courses/{id}:
 *    get:
 *     tags: [Courses]
 *     summary: Search a Course by Id.
 *     description: > 
 *       **This route will search a course by id.**
 * 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *           description: Id del curso que se desea buscar.
 * 
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseByIdResponse'
 * 
*/

// Get Course By Name And Get All Courses
routesCourse.get("/:title", courseByName)
/**
 * @openapi
 * paths:
 *   /courses/:title
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



module.exports = routesCourse;
