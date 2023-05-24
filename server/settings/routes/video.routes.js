const { Router } = require("express");

const videoRoutes = Router();

const postVideo = require("../controllers/video/postVideo.controller");
const getAllVideo = require("../controllers/video/getAllVideo.controller");
const getOneVideo = require("../controllers/video/getOneVideo.controller");

// videoRoutes.get("/", getAllVideo);

// videoRoutes.get("/:id", getOneVideo);


module.exports = videoRoutes;
