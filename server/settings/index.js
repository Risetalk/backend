// Third Party Dependencies.
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// Local Dependencies.
const routes = require("../settings/routes/index.routes");

// Server Initialization.
const app = express();

// Middlewares.

// Morgan.
app.use(morgan("dev"));

// Cors.
app.use(cors());

// Json.
app.use(express.json());

// Router.
app.use("/", routes);

module.exports = app;
