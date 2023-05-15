// Local Dependencies.
const Course = require("../../../../database/models/course.model");
const User = require("../../../../database/models/user.model");

const postCourse = async (req, res) => {

  // Get the id from the query.
  const { id } = req.query;

  // Get the data from the body.
  const { title, description, background_image, price } = req.body;

  try {

    // Search if the user exists.
    const user = await User.findByPk(id);

    // If the user does not exist, return an error.
    if (!user) return res.status(400).json({ error: "User not found" });

    // If the user is not a tutor, return an error.
    if (!user.is_tutor)
      return res
        .status(401)
        .json({ error: "User is not authorized to create courses" });

    // Create the course.
    const course = await Course.create({
      title,
      description,
      background_image,
      price,
    });

    // Add the course to the user.
    course.addUser(id);

    // Return the course.
    res.status(200).json(course);

  } catch (error) {

    // If there is an error, return it.
    res.status(404).json(error.message);

  }
};

module.exports = postCourse;
