const Lesson = require("../../../../database/models/lesson.model");
const Course = require("../../../../database/models/course.model");

const getOneLesson = async (req, res) => {
    //I receive by params the id of the lesson
    const { id } = req.params;

    try {
        //I am looking for the lesson by id
        const oneLesson = await Lesson.findByPk(id);
        //I verify that the desired lesson exists.
        if (!oneLesson) return res.status(400).json({ error: "The course does not exist" })
        //I return the lesson sought
        res.status(200).json(oneLesson);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = getOneLesson;