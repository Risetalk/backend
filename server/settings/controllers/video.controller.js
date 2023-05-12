const {Router} = require("express")
const Videos = require("../../../utils/Videos.json")
const video = require("../../../database/models/video.model")
const routesVideo = Router()

routesVideo.get("/", async (req, res) => {
    try {
      for(let objVideo of Videos) {
        await video.findOrCreate({
          where: {
            title: objVideo.title,
            description: objVideo.description,
            url_video: objVideo.url_video
          },
        });
      };
  
      const allVideos = await video.findAll()
  
      res.status(200).json(allVideos);
    } catch (error) {
        res.json(error)
    }
})

module.exports = routesVideo;