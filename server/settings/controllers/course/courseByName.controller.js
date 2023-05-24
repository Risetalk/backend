const Course = require("../../../../database/models/course.model")

const courseByName = async (req, res) => {
    //I receive the title to search for through params
    const { title } = req.params;
    try {
        //I fetch all the courses
        const allCourse = await Course.findAll()
        //I search for the title in the courses
        const courseByName = allCourse.filter((cour) => cour.title.toLowerCase().includes(title.toLowerCase()))
        //If there are no related courses, i return an error
        if (courseByName.length === 0) return res.status(404).json({ message: "No course found with that name" })
        //I return all related courses
        res.status(200).json(courseByName)

    } catch (error) {

        res.status(404).json({ message: error.message })

    }
}

module.exports = courseByName;