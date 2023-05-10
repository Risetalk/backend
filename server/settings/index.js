
const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes/index.routes");



const app = express()
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/", routes);


module.exports=app;