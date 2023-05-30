const Course = require("../../../../database/models/course.model");
const User = require("../../../../database/models/user.model");

const postViewCourse = async (req, res) => {
  
  // Get the user_id from the body.
  const { userId, courseId } = req.body;

  try {
    // Verify if the user is a student
    const user = await User.findOne({ _id: userId, is_tutor: false });

    if (!user)
      return res.status(400).json({
        status: 400,
        message: "User not found or is not a student",
      });

    // Verify if the user has bought the course.
    const course = await user.getCourses({ where: { id: courseId } });

    if (!course)
      return res.status(400).json({
        status: 400,
        message: "User has not bought this course",
      });

    // Get the course.
    const courseView = await Course.findOne({ where: { id: courseId } });

    if (!courseView)
      return res.status(400).json({
        status: 400,
        message: "Course not found",
      });

    // Get the lesons of the course.
    const lessons = await courseView.getLessons();

    // Get the videos of the every lesson.
    const videos = await lessons.map(async (lesson) => {
      return await lesson.getVideos();
    });

    // Get the category of the course.
    const category = await courseView.getCategory();

    // Get the owner of the course.
    const owner = await courseView.getUser();

    // Structure the data.
    const data = {
      course: {
        id: courseView.id,
        title: courseView.title,
        description: courseView.description,
        like: courseView.like,
        dislike: courseView.dislike,
        updatedAt: courseView.updatedAt,
        category: {
          title: category.title,
          background_image: category.background_image,
        },
        language: courseView.language,
        background_image: courseView.background_image,
        lessons: [
          ...lessons.map((lesson, index) => {
            return {
              title: lesson.title,
              description: lesson.description,
              videos: videos[index].map((video) => {
                return {
                  title: video.title,
                  description: video.description,
                  video_url: video.video_url,
                };
              }),
            };
          }),
        ],
      },
      owner: {
        id: owner.id,
        profile_picture: owner.profile_picture,
        first_name: owner.first_name,
        last_name: owner.last_name,
      },
    };

    return res.status(200).json({
      status: 200,
      message: "Course found",
      data: data,
    });
    
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};
