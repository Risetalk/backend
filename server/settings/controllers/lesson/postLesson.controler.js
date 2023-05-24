//Local dependence
const Course = require("../../../../database/models/course.model");
const Lesson = require("../../../../database/models/lesson.model");
const postVideo = require("../video/postVideo.controller");

const postLesson = async ( req ,res , courseId, lessons) => {
  try {

    // Vaidate the data.
    if (!courseId || !lessons)
      return res.status(412).json({
        status: 412,
        message: "All fields in lessons are required.!!!",
      });

    // Validate the lessons.
    lessons.forEach(async ({ title, description , videos }) => {

      // Validate field lengths.
      if (
        // Title Length.
        title.length < 5 ||
        title.length > 50 ||
        // Description Length.
        description.length < 10 ||
        description.length > 500 ||
        // Videos Length.
        videos.length < 1
      )
        return res.status(412).json({
          status: 412,
          message: "Invalid field length!!!",
        });
    
    });

    // Create the lessons.
    lessons.forEach(async ({ title, description , videos }) => {
        
        // Create the lesson.
        const lessonCreated = await Lesson.create({
            title: title,
            description: description,
            courseId: await courseId,
        });

        // Add the videos to the lesson.
        await postVideo(req , res , lessonCreated.id , videos)
    });

  } catch (error) {

    // Return the error.
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
    
  }
};

module.exports = postLesson;
