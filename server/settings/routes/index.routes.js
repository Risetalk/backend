// Objective: Define the routes of the application.

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


module.exports = routes;