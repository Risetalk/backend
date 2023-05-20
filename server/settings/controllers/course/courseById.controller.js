// Local Dependencies.
const Course = require("../../../../database/models/course.model");
const Video = require("../../../../database/models/video.model");
const Lesson = require("../../../../database/models/lesson.model");


//This function will verify that the data coming in is a UUID.
function esUUID(dato) {
  const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  return regex.test(dato);
}

const courseById = async (req, res, next) => {
  //First, i check if the data sent is a UUID, otherwise it moves on to the next
  if (esUUID(req.params.id)) {

    // Get the id from the params.
    const { id } = req.params;

    try {

      // Get the course by id.
      const course = await Course.findByPk(id);

      // If the course does not exist, return a 404.
      if (!course) {
        return res.status(404).json({ error: "The requested id does not exist" });
      }
      //I bring all the lessons of the courses
      const AllLessonsOfCourse = await course.getLessons();
      //I verify that the number of lessons is not zero.
      if (AllLessonsOfCourse.length === 0) return res.status(404).json({ error: "The course has no lessons" });
      //I am looking for all the videos of the lessons
      let videoCounter = 0;
      for (let i = 0; i < AllLessonsOfCourse.length; i++) {
        const lesson = await Lesson.findByPk(AllLessonsOfCourse[i].id);
        const allVideosOfLesson = await lesson.getVideos();
        allVideosOfLesson.map((video) => videoCounter++);

      }

      //I build an object with all the information
      const allInformationCourse = {

        // Spread Operator and Convert to JSON.
        ...course.toJSON(),
        // Add the number of videos.
        video: videoCounter,
        lessons: AllLessonsOfCourse.length,

      };
      //Retorno con toda la informacion
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

  } else {

    next();

  }

};

module.exports = courseById;

