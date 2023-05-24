// Third Party Dependencies.
const express = require("express"),
  morgan = require("morgan"),
  cors = require("cors"),
  bodyParser = require("body-parser");  

// Local Dependencies.
const routes = require("../settings/routes/index.routes");

// Server Initialization.
const app = express();

// Middlewares.

// Json.
app.use(express.json());

// Body Parser.
app.use(bodyParser.json());

// Morgan.
app.use(morgan("dev"));

// Cors.
app.use(cors( { origin: "*" } ));

// Router.
app.use("/", routes);

module.exports = app;
