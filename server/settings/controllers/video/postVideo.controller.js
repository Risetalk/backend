const Video = require("../../../../database/models/video.model");
const Course = require("../../../../database/models/course.model");


const postVideo = async (req, res) => {
    const { title, description, url_video } = req.body;
    const { idCourse } = req.query;

    try {
        const course = await Course.findByPk(idCourse);
        if (!course) {
            return res.status(400).json({ error: "Course not found" });
        }

        const existingVideo = await Video.findAll({
            where: {
                courseId: idCourse,
            },
        });

        let bandera = false;

        for (let i = 0; i < existingVideo.length; i++) {
            
            if (
                existingVideo[i].dataValues.title.toLowerCase() === title.toLowerCase()
            ) {
                bandera = true;
                i = existingVideo.length;
            }
        }

         if (bandera) return res.status(400).json({ error: "The video already exists in the course!" });

        const newVideo = await Video.create({
            title,
            description,
            url_video,
            courseId: idCourse, 
        });

        res.status(200).json(newVideo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = postVideo;