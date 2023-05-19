// Local Dependencies.
const User = require("../../../../database/models/user.model");


const allCoursesByUser = async (req, res) => {
    const { id } = req.query;
    try {
        //I am looking for the user
        const user = await User.findByPk(id);
        //If the user does not exist, return error
        if (!user) return res.status(400).json({ error: "The user does not exist" });
        //If the user is not a tutor, it returns error
        if (!user.is_tutor) return res.status(400).json({ error: "The user is not a tutor, does not have created courses" });

        //I bring the courses of this user
        const courses = await user.getCourses();

        //If the number of courses is zero, return error
        if (courses.length === 0) return res.status(400).json({ error: "The tutor has not created any courses yet" });
        //Return found courses
        res.status(200).json(courses);

    } catch (error) {

        res.status(404).json({ message: error.message });
    }
};

module.exports = allCoursesByUser;
