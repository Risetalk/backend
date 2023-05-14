const Course = require("../../../../database/models/course.model");
const Video = require("../../../../database/models/video.model");

const getAllVideo = async (req, res) => {

    const { idCourse } = req.query;

    try {

        const course = await Course.findByPk(idCourse);
        if (!course) {
            return res.status(400).json({ error: "Course not found" });
        }

        const allVideoOfCourse = await Video.findAll({
            where: {
                courseId: idCourse
            }
        });

        res.status(200).json(allVideoOfCourse);
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}


module.exports = getAllVideo;