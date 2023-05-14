// Third Party Dependencies.
const { Router } = require("express");

// Local Dependencies.
const postCourses = require("../controllers/course/course.controllers");

// Router Instance.
const routesCourse = Router();

// Post Course Route.
routesCourse.post("/", postCourses);
/**
 * @openapi
 * paths:
 *   /course:
 *    get:
 *     tags: [Courses]
 *     summary: Get all Courses Information
 *     description: > 
 *       **This route will return all courses information registered in the database.**
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Course'
 * 
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 * 
 *    post:
 *     tags: [Courses]
 *     summary: Create a new Course in the database.
 *     description: >
 *       **This route will create a new course in the database.**
 * 
 *    put:
 *     tags: [Courses]
 *     summary: Update Course Information.
 *     description: >
 *       **This route will update a course in the database.**
 * 
 * 
*/

module.exports = routesCourse;
