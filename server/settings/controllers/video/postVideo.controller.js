const Video = require("../../../../database/models/video.model");
const Lesson = require("../../../../database/models/lesson.model");


const postVideo = async (req, res) => {

    const { id } = req.query;
    
    const { title, description, url_video } = req.body;
    
    try {
        const lesson = await Lesson.findByPk(id);

        if (!lesson) {
            return res.status(400).json({ error: "Lesson not found" });
        }

        const allVideosOfLesson = await lesson.getVideos(); 

        let bandera = false;

        for (let i = 0; i < allVideosOfLesson.length; i++) {
            if (
                allVideosOfLesson[i].title.toLowerCase() === title.toLowerCase()
            ) {
                bandera = true;
                i = allVideosOfLesson.length;
            }
        }

        if (bandera) return res.status(400).json({ error: "TThe video already exists in the lesson!" });

        const newVideo = await Video.create({
            title,
            description,
            url_video,
            lessonId: id
        });

        res.status(200).json(newVideo);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = postVideo;