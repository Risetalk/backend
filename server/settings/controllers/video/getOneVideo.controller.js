
const Video = require("../../../../database/models/video.model");

const getOneVideo = async (req, res) => {

    const { id } = req.params;

    try {

        const video = await Video.findByPk(id);
        if (!video) {
            return res.status(400).json({ error: "The video does not exist" });
        }
        
        res.status(200).json(video);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}


module.exports = getOneVideo;