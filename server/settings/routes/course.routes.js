

const { Router } = require("express")

const postCourses=require("../controllers/Courses/postCourses.controllers");


const routesCourse = Router();



routesCourse.post("/", postCourses )



module.exports = routesCourse;