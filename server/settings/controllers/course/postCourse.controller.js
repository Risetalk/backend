// Local Dependencies.
const Course = require("../../../../database/models/course.model");
const User = require("../../../../database/models/user.model");
const postLesson = require("../lesson/postLesson.controler");

const postCourse = async (req, res) => {

  // Get the id from the query.
  const { id } = req.query;

  // Get the data from the body.
  const { course } = req.body;


  try {

    // If the ID is not provided, return an error.
    if (!id || !course)
      return res.status(412).json({
        status: 412,
        message: "All fields are required.!!!",
      });

    // Destructure the course.
    const { title, description, language, background_image, price , lessons } = course;


    // Langauge validation.
    if (
      language !== "spanish" &&
      language !== "english" &&
      language !== "portuguese" &&
      language !== "french"
    )
      return res.status(412).json({
        status: 412,
        message: "Invalid language!!!",
      });
    

    // Validate field lengths.
    if (
      // Title Length.
      title.length < 5 || title.length > 50 ||
      // Description Length.
      description.length < 10 || description.length > 500 ||
      // Background Image Length.
      background_image.length < 10 || background_image.length > 500 ||
      // Price Length.
      price < 0 || price > 1000000.00
    )
      return res.status(412).json({
        status: 412,
        message: "Invalid field length!!!",
      });

    // Search if the user exists.
    const user = await User.findByPk(id);

    // If the user does not exist, return an error.
    if (!user)
      return res.status(404).json({
        status: 404,
        message: "User does not exist!!!" ,
      });

    // If the user is not a tutor, return an error.
    if (!user.is_tutor)
      return res.status(403).json({
        status: 403,
        message: "You are not authorized to create courses!!!",
      });

    // Get all courses of the user.
    const allCourses = await Course.findAll({
      where: {
        userId: id,
      },
    });

    // If the course already exists, return an error.
    if (
      allCourses.find(
        (course) => course.title.toUpperCase() === title.toUpperCase()
      )
    )
      return res.status(409).json({
        status: 409,
        message: "Course already exists!!!",
      });

    // Create the course.
    const courseCreated = await Course.create({
      title: title,
      description: description,
      language: language,
      background_image: background_image,
      price: price,
      userId: id,
    });

    // Create the lessons.
    await postLesson(req, res , courseCreated.id , lessons)

    // Return the course.
    res.status(201).json({
      status: 201,
      message: "Course created successfully!!!",
    });

  } catch (error) {
    // If there is an error, return it.
    res.json({
      status: error.status || 500,
      message: error.message || "Internal server error!!!",
    });
  }
};

module.exports = postCourse;
