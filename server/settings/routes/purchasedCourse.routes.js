// Third Party Dependencies.
const { Router } = require("express");
const allCourses = require("../controllers/course/allCourses.controller");

// Local Dependencies.
const postPurchasedCourse = require("../controllers/purchasedCourse/postpurchasedCourse.controller");
const getAllpurchasedCourse = require("../controllers/purchasedCourse/getAllpurchasedCourse.controller");
// Router Instance.
const routesPurchasedCourse = Router();

// Post purchasedCourse Route.
routesPurchasedCourse.post("/", postPurchasedCourse);
/**
 * @openapi
 * paths:
 *   /courses:
 *    post:
 *     tags: [purchased]
 *     summary: Create a new Purchased Course in the database.
 *     description: > 
 *       **This route will create a new Purchased Course in the database.**
 *     parameters:
 *       - in: query
 *         name: idUser
 *         type: string
 *         required: true
 *         description: Id del usuario que compro el curso.
 *      - in: query
 *         name: idCourse
 *         type: string
 *         required: true
 *         description: Id del curso que compro el usuario.
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


routesPurchasedCourse.get("/", getAllpurchasedCourse);
/**
 * @openapi
 * paths:
 *   /courses:
 *    get:
 *     tags: [purchased]
 *     summary: Search All Purchased Course.
 *     description: > 
 *       **This route will search all  Purchased Course.**
 *     parameters:
    *       - in: query
    *         name: id
    *         type: string
    *         required: true
    *         description: Id del usuario que compro los cursos.
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

module.exports = routesPurchasedCourse;