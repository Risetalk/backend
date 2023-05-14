const Course = require("../../../../database/models/course.model");
const CourseComment = require("../../../../database/models/courseComment.model")

const getAllCommentcourseById = async (req, res) => {

    const { idCourse } = req.query;

    try {
        const course = await Course.findByPk(idCourse);
        if (!course) return res.status(400).json({ error: "Course not found" });

        const allCommentCourse = await CourseComment.findAll({
            where: {
                courseId: idCourse
            }
        });

        res.status(200).json(allCommentCourse);

    } catch (error) {

        res.status(400).json({ error: error.message });

    }
}

module.exports = getAllCommentcourseById;