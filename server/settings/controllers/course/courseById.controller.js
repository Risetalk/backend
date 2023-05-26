// Local Dependencies.
const Category = require("../../../../database/models/category.model");
const Course = require("../../../../database/models/course.model");
const Lesson = require("../../../../database/models/lesson.model");
const User = require("../../../../database/models/user.model");
const Video = require("../../../../database/models/video.model");

// Course By Id Controller.
const courseById = async (req, res) => {
  try {
    // Desctructure the request body.
    const { id } = req.params;

    // Validate the course id.
    if (!id)
      return res.status(412).json({
        status: 412,
        message: "Course id is required.!!!",
      });

    // Validate the course id is UUID.
    if (id.length !== 36)
      return res.status(412).json({
        status: 412,
        message: "Course id is invalid.!!!",
      });

    // Find the course.
    const course = await Course.findOne({
      where: {
        id: id,
      },
    });

    // Get Lessons.
    const lessons = await Lesson.findAll({
      where: {
        courseId: id,
      },
    });

    // Get All videos from the lessons.
    const videos = await Promise.all(
      lessons.map(async (lesson) => {
        return await Video.findAll({
          where: {
            lessonId: lesson.id,
          },
        });
      })
    );

    console.log(videos);

    // Get User data.
    const user = await User.findOne({
      where: {
        id: course.userId,
      },
    });

    // Get Category data.
    const category = await Category.findOne({
      where: {
        id: course.categoryId,
      },
    });

    // Desctructure the User data.
    const { profile_picture, first_name, last_name } = user;

    // Structure the data.
    const data = {
      course: {
        id: course.id,
        title: course.title,
        description: course.description,
        price: course.price,
        like: course.like,
        dislike: course.dislike,
        updatedAt: course.updatedAt,
        category: {
          title: category.title,
          background_image: category.background_image,
        },
        language: course.language,
        background_image: course.background_image,
        lessons: [
          ...lessons.map((lesson , index ) => {
            return {
              title: lesson.title,
              description: lesson.description,
              videos: videos[index].map((video) => {
                return {
                  title: video.title,
                  description: video.description,
                };
              }),
            };
          })
        ],
      },
      user: {
        id: user.id,
        profile_picture: profile_picture,
        first_name: first_name,
        last_name: last_name,
      },
    };

    // Return the response.
    return res.status(200).json({
      status: 200,
      message: "Course found.!!!",
      data: data,
    });
  } catch (error) {
    // Return the error.
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

module.exports = courseById;
