const Lesson = require("../../../../database/models/lesson.model");

const getAllVideo = async (req, res) => {

    const { id } = req.query;

    try {

        const lesson = await Lesson.findByPk(id);
        if (!lesson) {
            return res.status(400).json({ error: "Lesson not found" });
        }
        const allVideosOfLesson = await lesson.getVideos();
        if (allVideosOfLesson.length === 0) return res.status(400).json({ error: "There are no videos in this lesson" });

        res.status(200).json(allVideosOfLesson);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}


module.exports = getAllVideo;