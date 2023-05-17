// Local Dependencies.
const purchasedCourse = require("../../../../database/models/purchasedCourse.model");
const User = require("../../../../database/models/user.model");



const getAllpurchasedCourse = async (req, res) => {

    // Get the id from the query.
    const { id } = req.query;

    try {

        // Search if the user exists.
        const user = await User.findByPk(id);

        // If the user does not exist, return an error.
        if (!user) return res.status(400).json({ error: "User not found" });


        // Get all the course of the user.
        const allCoursesOfUser = await purchasedCourse.findAll({
            where: {
                userId: id,
            },
        });
        //Question if the number of courses is zero
        if (allCoursesOfUser.length === 0) return res.status(200).json({ error: "No courses purchased!"});
        //Respond with the courses found
        res.status(200).json(allCoursesOfUser);

    } catch (error) {

        // If there is an error, return it.
        res.status(404).json(error.message);

    }
};


module.exports = getAllpurchasedCourse;