// Local Dependencies.
const purchasedCourse = require("../../../../database/models/purchasedCourse.model");
const User = require("../../../../database/models/user.model");
const Course = require("../../../../database/models/course.model");


const postpurchasedCourse = async (req, res) => {

    //Get user id and course id for the query.
    const { idUser, idCourse } = req.query;

    try {

        // Search if the user exists.
        const user = await User.findByPk(idUser);

        // If the user does not exist, return an error.
        if (!user) return res.status(400).json({ error: "User not found" });

        // Search if the course exists.
        const course = await Course.findByPk(idCourse);

        // If the course does not exist, return an error.
        if (!course) return res.status(400).json({ error: "Course not found" });


        // Get all the purchased course of the user.
        const allCoursesOfUser = await purchasedCourse.findAll({
            where: {
                userId: idUser,
            },
        });

        //Check if the course is already purchased 
        let bandera = false;

        for (let i = 0; i < allCoursesOfUser.length; i++) {

            if (
                allCoursesOfUser[i].dataValues.id === course.id
            ) {
                bandera = true;
                i = allCoursesOfUser.length;
            }
        }
        //If the course is purchased, it returns an error.
        if (bandera) return res.status(400).json({ error: "The course already exists in the user!" });

        //Collect the necessary data to save the purchased course
        const newCourse = await purchasedCourse.create({
            id: course.id,
            title: course.title,
            description: course.description,
            background_image: course.background_image,
            released_date: course.released_date,
            price: course.price,
            userId: idUser,
        });
        //Respond with the purchased course
        res.status(200).json(newCourse);

    } catch (error) {

        // If there is an error, return it.
        res.status(404).json(error.message);

    }
};


module.exports = postpurchasedCourse;