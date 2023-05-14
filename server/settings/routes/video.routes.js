const { Router } = require("express");

const videoRoutes = Router();

const postVideoController=require("../controllers/video/postVideo.controller");
const getAllVideoController=require("../controllers/video/getAllVideo.controller");

videoRoutes.post("/", postVideoController);
videoRoutes.get("/",getAllVideoController);

module.exports = videoRoutes;
