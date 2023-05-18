// Local Dependencies.

const User = require("../../../../database/models/user.model");



const getAllpurchasedCourse = async (req, res) => {

    // Get the id from the query.
    const { id } = req.query;

    try {

        // Search if the user exists.
        const user = await User.findByPk(id);

        // If the user does not exist, return an error.
        if (!user) return res.status(400).json({ error: "User not found" });
        //I bring all user related courses
        const courses = await user.getCourses();
        //Question if the number of courses is zero
        if (courses.length === 0) return res.status(200).json({ error: "No courses purchased!" });
        //Respond with the courses found
        res.status(200).json(courses);

    } catch (error) {

        // If there is an error, return it.
        res.status(404).json(error.message);

    }
};


module.exports = getAllpurchasedCourse;