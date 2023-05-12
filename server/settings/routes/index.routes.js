const { Router } = require("express");

const routesCourse = require("../controllers/course.controller");
const routesVideo = require("../controllers/video.controller")
const routes = Router();

routes.use("/course", routesCourse)
routes.use("/video", routesVideo)
routes.get("/prueba", (req, res) => {
    res.status(200).send("Paso la prueba");
});

module.exports = routes;