// Third Party Dependencies.
const { Router } = require("express");
const allCourses = require("../controllers/course/allCourses.controller");

// Local Dependencies.
const courseById = require("../controllers/course/courseById.controller")
const courseByName = require("../controllers/course/courseByName.controller");
const postCourse = require("../controllers/course/postCourse.controller");
const viewCourse=require("../controllers/course/postViewCourse");

// Router Instance.
const routesCourse = Router();

// Post Course Route.
routesCourse.post("/", postCourse);
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
 *         description: Id of the user who wants to create the course.
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

//This path returns all course data
routesCourse.post("/view-course", viewCourse);
/**
 * @openapi
 * paths:
 *   /courses:
 *    post:
 *     tags: [Courses]
 *     summary: Create a new Course in the database.
 *     description: > 
 *       **This path returns all course data.**
 *     
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/postViewCourse'
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

// Get Course By Id
routesCourse.get("/:id", courseById)
/**
 * @openapi
 * paths:
 *   /courses/{id}:
 *    get:
 *     tags: [Courses]
 *     summary: Search a Course by id.
 *     description: > 
 *       **This route will search a course by id.**
 *     requestBody:
 *       required: false
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



// Get Course By Name And Get All Courses
routesCourse.get("/name", courseByName)
/**
 * @openapi
 * paths:
 *   /courses/{name}:
 *    get:
 *     tags: [Courses]
 *     summary: Search a Course by Name.
 *     description: > 
 *       **This route will search a course by name.**
 *     requestBody:
 *       required: false
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
/**
 * @openapi
 * paths:
 *   /courses:
 *    get:
 *     tags: [Courses]
 *     summary: Bring the courses with paging.
 *     description: > 
 *       **This path returns the courses with the pagination.**
 *     parameters:
 * 
 *       - in: query
 *         name: page
 *         type: int
 *         required: true
 *         description: This is the page number.
 * 
 *       - in: query
 *         name: limit
 *         type: int
 *         required: true
 *         description: This is the page limit.
 * 
 *     requestBody:
 *       required: false
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
