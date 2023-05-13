// Third Party Dependencies.
const express = require("express"),
  morgan = require("morgan"),
  cors = require("cors"),
  swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express"),
  options = require("./docs/");

// Local Dependencies.
const routes = require("../settings/routes/index.routes");

// Server Initialization.
const app = express();

// Swagger Specification.
const specs = swaggerJsdoc(options);

// Middlewares.

// Swagger.
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Morgan.
app.use(morgan("dev"));

// Cors.
app.use(cors());

// Json.
app.use(express.json());

// Router.
app.use("/", routes);

module.exports = app;
