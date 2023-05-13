// Third Party Dependencies.
const { Router } = require("express");

// Local Dependencies.
const courseRoutes = require("./course.routes");
const videoRoutes = require("./video.routes");
const userRoutes = require("./user.routes");
const postRoutes = require("./post.routes");
const paymentMethodRoutes = require("./paymentMethod.routes");

// Router Instance.
const routes = Router();

routes.use("/courses", courseRoutes);
routes.use("/video", videoRoutes);
routes.use("/post",postRoutes);
routes.use("/user",userRoutes);
routes.use("/payment",paymentMethodRoutes);


routes.get("/docs", (req, res) => {
    res.status(200).send("Paso ruta para Docs");
});

module.exports = routes;