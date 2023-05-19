// Local Dependencies.
const Course = require("../../../../database/models/course.model");
const User = require("../../../../database/models/user.model");

const postCourse = async (req, res) => {

  // Get the id from the query.
  const { id } = req.query;

  // Get the data from the body.
  const { title, description, language, background_image, price } = req.body;

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
    
    //I verify if the language field matches the values
    //if (language != "spanish" || language != "english" || language != "french" || language != "portuguese") return res.status(400).json({ error: "Language not supported" });

    //I bring all courses
    const allCourses = await Course.findAll();


    //Check if the course already exists
    let bandera = false;
    for (let i = 0; i < allCourses.length; i++) {
      if (
        allCourses[i].title.toLowerCase() === title.toLowerCase()
      ) {
        bandera = true;
        i = allCourses.length;
      }
    }

    //If the course is purchased, it returns an error.
    if (bandera) return res.status(400).json({ error: "The course already exists on the platform!" });


    // Create the course.
    const newCourse = await Course.create({
      title,
      description,
      language,
      background_image,
      price,
      userId: user.id // Asigna el ID del usuario al campo userId en el nuevo curso
    });
    
    // Return the course.
    res.status(200).json(newCourse);

  } catch (error) {

    // If there is an error, return it.
    res.status(404).json(error.message);

  }
};

module.exports = postCourse;
