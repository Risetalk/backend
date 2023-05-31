// Local Dependencies.

const User = require("../../../../database/models/user.model");
const Course = require("../../../../database/models/course.model");


const postpurchasedCourse = async (req, res) => {

    //Get user id and course id for the query.
    const { idUser, idCourse } = req.query;

    console.log(idUser)
    console.log(idCourse)

    try {

        // Search if the user exists.
        const user = await User.findByPk(idUser);

        // If the user does not exist, return an error.
        if (!user) return res.status(400).json({ error: "User not found" });


        // I check if the user is not a tutor
        if (user.is_tutor) return res.status(400).json({ error: "Cannot buy" });

        // Search if the course exists.
        const course = await Course.findByPk(idCourse);

        // If the course does not exist, return an error.
        if (!course) return res.status(400).json({ error: "Course not found" });

        //I bring all user related courses
        const courses = await user.getCourses();

        //Check if the course is already purchased 
        let bandera = false;

        for (let i = 0; i < courses.length; i++) {

            if (
                courses[i].dataValues.id === course.id
            ) {
                bandera = true;
                i = courses.length;
            }
        }

        //If the course is purchased, it returns an error.
        if (bandera) return res.status(400).json({ error: "The course already exists in the user!" });
        //I keep the relationship of the course with the user
        await user.addCourse(course);

        //Respond with the purchased course
        res.status(200).json(course);

    } catch (error) {

        // If there is an error, return it.
        res.status(404).json(error.message);

    }
};


module.exports = postpurchasedCourse;