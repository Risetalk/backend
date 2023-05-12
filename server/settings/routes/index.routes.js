const { Router } = require("express");

const routesCourse = require("../controllers/course.controller");
const routesVideo = require("../controllers/video.controller");
const routesUser=require("../controllers/user.controllers");
const routesPost=require("../controllers/post.controllers");
const routesPaymentMethod=require("../controllers/paymentMethod.controllers");


const routes = Router();

routes.use("/course", routesCourse);
routes.use("/video", routesVideo);
routes.use("/post",routesPost);
routes.use("/user",routesUser);
routes.use("/payment",routesPaymentMethod);


routes.get("/prueba", (req, res) => {
    res.status(200).send("Paso la prueba");
});

module.exports = routes;