
const Course = require("../../../../database/models/course.model");
const CourseComment = require("../../../../database/models/courseComment.model")
const User = require("../../../../database/models/user.model");

const getAllCommentcourseById = async (req, res) => {

    const { idCourse } = req.query;
    console.log(idCourse);

    try {

        const course = await Course.findByPk(idCourse);

        if (!course) return res.status(400).json({ error: "Course not found" });

        const allCommentCourse = await CourseComment.findAll({
            where: {
                courseId: idCourse
            }
        });

        if (allCommentCourse.length === 0) return res.status(400).json({ error: "No hay comentarios de ese curso" });


        const actuallyInfomation = async (array) => {

            const newArray = [];

            for (let i = 0; i < array.length; i++) {

                const userId = array[i].userId;
                const userById = await User.findByPk(userId);

                const newInformation = {
                    id: array[i].id,
                    message: array[i].message,
                    createdAt: array[i].createdAt,
                    updatedAt: array[i].updatedAt,
                    user: userById,
                    course: course,

                }

                newArray.push(newInformation);
            }

            return newArray;
        }

        const allCommentData = await actuallyInfomation(allCommentCourse);


        res.status(200).json(allCommentData);

    } catch (error) {

        res.status(400).json({ error: error.message });

    }
}

module.exports = getAllCommentcourseById;