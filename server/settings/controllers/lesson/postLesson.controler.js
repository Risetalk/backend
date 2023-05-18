//Local dependence
const Lesson = require("../../../../database/models/lesson.model");
const Course = require("../../../../database/models/course.model");

const postLesson = async (req, res) => {
    //I receive the course id by query
    const { id } = req.query;
    //I receive the data of the lesson by body
    const { title, description } = req.body;


    try {
        //I am looking for the course by id
        const course = await Course.findByPk(id);
        //If the course does not exist, it returns an error.
        if (!course) return res.status(400).json({ error: "The course does not exist" })
        //I bring all the lessons of the course
        const AllLessonsOfCourse = await course.getLessons();
        //I check that there is no lesson to be saved.
        let bandera = false;
        for (let i = 0; i < AllLessonsOfCourse.length; i++) {
            if (
                AllLessonsOfCourse[i].title.toLowerCase() === title.toLowerCase()
            ) {
                bandera = true;
                i = AllLessonsOfCourse.length;
            }
        }

        //If the course is purchased, it returns an error.
        if (bandera) return res.status(400).json({ error: "The lesson already exists in the course!" });
        //I create the lesson and relate it to the course.
        const newLesson = await Lesson.create({
            title,
            description,
            courseId: course.id,
        });

        //I return the new lesson
        res.status(200).json(newLesson)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = postLesson;