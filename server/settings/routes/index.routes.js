const { Router } = require("express");
const GetByNameCourse = require("../controllers/course.controller");

const routes = Router();

routes.get("/course/:id/videos", GetByNameCourse);

module.exports = routes;