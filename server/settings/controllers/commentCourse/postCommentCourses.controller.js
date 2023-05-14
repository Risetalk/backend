const Course = require("../../../../database/models/course.model");
const User = require("../../../../database/models/user.model");
const CourseComment = require("../../../../database/models/courseComment.model");





const postCommentCourses = async (req, res) => {
    const { idUser, idCourse, message } = req.body;
    try {
        
        const user = await User.findByPk(idUser);
        if (!user) return res.status(400).json({ error: "User not found" });
        const course = await Course.findByPk(idCourse);
        if (!course) return res.status(400).json({ error: "Course not found" });


        const newComentario = await CourseComment.create({
            message,
            courseId: idCourse,
            userId: idUser
        });

        res.status(200).json(newComentario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

module.exports = postCommentCourses;