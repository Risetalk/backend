const { Router } = require("express");

const routesCourse = require("./course.routes");
const routesVideo = require("./video.routes");
const routesUser = require("./user.routes");
const routesPost = require("./post.routes");
const routesPaymentMethod = require("./paymentMethod.routes");


const routes = Router();

routes.use("/courses", routesCourse);
routes.use("/video", routesVideo);
routes.use("/post",routesPost);
routes.use("/user",routesUser);
routes.use("/payment",routesPaymentMethod);


routes.get("/prueba", (req, res) => {
    res.status(200).send("Paso la prueba");
});

module.exports = routes;