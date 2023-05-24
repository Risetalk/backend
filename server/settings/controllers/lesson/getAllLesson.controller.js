const Lesson = require("../../../../database/models/lesson.model");
const Course = require("../../../../database/models/course.model");

const getAllLesson = async (req, res) => {
    //I receive the course id by query
    const { id } = req.query;
    try {
        //I am looking for the course by id
        const course = await Course.findByPk(id);
        //If the course does not exist, it returns an error.
        if (!course) return res.status(400).json({ error: "The course does not exist" })
        //I bring all the lessons of the course
        const AllLessonsOfCourse = await course.getLessons();
        //Return all lessons
        res.status(200).json(AllLessonsOfCourse);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = getAllLesson;