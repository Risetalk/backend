const { Router } = require("express");

const videoRoutes = Router();

const postVideoController=require("../controllers/video/postVideo.controller");


videoRoutes.post("/", postVideoController);

module.exports = videoRoutes;
