// Local Dependencies.
const User = require("../../../../database/models/user.model");


const allCoursesByUser = async (req, res) => {
   
    // Get the user_id from the body.
    const { userId } = req.body;

    try {
        
        // Verify if the user is a student
        const user = await User.findOne({ id: userId, is_tutor: false });

        if (!user)
            return res.status(400).json({
                status: 400,
                message: "User not found or is not a student",
            });

        // Get the courses of the user.
        const courses = await user.getCourses();
        
        // Verify if the user has courses.
        if (!courses)
            return res.status(400).json({
                status: 400,
                message: "User has not courses",
            });
        
        // Return the courses.
        return res.status(200).json({
            status: 200,
            message: "Courses found",
            courses
        });

    } catch (error) {

        // Return the error.
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error
        });
        

    }
};

module.exports = allCoursesByUser;
