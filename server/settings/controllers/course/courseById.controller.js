// Local Dependencies.
const Course = require("../../../../database/models/course.model");
const Video = require("../../../../database/models/video.model");

const courseById = async (req, res) => {
  // Get the id from the params.
  const { id } = req.params;

  try {

    // Get the course by id.
    const course = await Course.findByPk(id);

    // If the course does not exist, return a 404.
    if (!course) {
      return res.status(404).send("The requested id does not exist");
    }

    // Get all the videos of the course.
    const allVideoofCourse = await Video.findAll({
      where: {
        courseId: course.id,
      },
    });

    const allInformationCourse = {

      // Spread Operator and Convert to JSON.
      ...course.toJSON(),
      // Add the number of videos.
      video: allVideoofCourse.length,

    };

    res.status(200).send(allInformationCourse);
  } catch (error) {
    if (
      error.message.includes(
        "la sintaxis de entrada no es válida para tipo uuid"
      )
    ) {
      return res.status(404).send("The requested id does not exist");
    }

    res.status(404).json({ message: error.message });
  }
};

module.exports = courseById;
