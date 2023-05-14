const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express");

// Third Party Dependencies.
const { Router } = require("express");

// Local Dependencies.
const courseRoutes = require("./course.routes");
const commentCourseRoutes =require("./commentCourse.routes");
const videoRoutes = require("./video.routes");
const userRoutes = require("./user.routes");
const postRoutes = require("./post.routes");
const paymentMethodRoutes = require("./paymentMethod.routes");

// Router Instance.
const routes = Router();

routes.use("/courses", courseRoutes);
routes.use("/commentcourses", commentCourseRoutes);
routes.use("/video", videoRoutes);
routes.use("/post",postRoutes);
routes.use("/user",userRoutes);
routes.use("/payment",paymentMethodRoutes);

// Documentation Route.
// routes.get("/docs", (req, res) => {
//     res.status(200).send("Paso ruta para Docs");
// });

module.exports = routes;