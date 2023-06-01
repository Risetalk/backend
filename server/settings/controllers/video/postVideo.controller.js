const Video = require("../../../../database/models/video.model");
const Lesson = require("../../../../database/models/lesson.model");

const postVideo = async (req, res, lessonId, videos) => {
  try {
    // Validate data.
    await videos.forEach(async ({ title, description, video_url }) => {
      // Validate field lengths.
      if (
        // Title Length.
        title.length < 5 ||
        title.length > 50 ||
        // Description Length.
        description.length < 10 ||
        description.length > 500 ||
        // Video URL Length.
        video_url.length < 10 ||
        video_url.length > 500
      )
        return res.status(412).json({
          status: 412,
          message: "Invalid field length!!!",
        });
    });

    // Validate videos.
    await videos.forEach(async ({ title, description, video_url }) => {
      // Search if the video exists.
      const videoExists = await Video.findOne({
        where: { title: title, description: description, url_video: video_url },
      });
      // If the video exists, return an error.
      if (videoExists)
        return res.status(412).json({
          status: 412,
          message: `The video ${title} already exists!!!`,
        });
    });

    // Create the videos.
    await videos.forEach(async ({ title, description, video_url }) => {
      // Create the video.
      await Video.create({
        title: title,
        description: description,
        url_video: video_url,
        lessonId: lessonId,
      });

      // Add the video to the lesson.
      // const lesson = await Lesson.findByPk(lessonId);
      // await lesson.addVideo(videoCreated);
      
    });
    
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message,
    });
  }
};

module.exports = postVideo;











// const Video = require("../../../../database/models/video.model");
// const Lesson = require("../../../../database/models/lesson.model");

// const postVideo = async (req, res, lessonId, videos) => {
//   try {
//     // Validate data.
//     for (const { title, description, video_url } of videos) {
//       // Validate field lengths.
//       if (
//         // Title Length.
//         title.length < 5 ||
//         title.length > 50 ||
//         // Description Length.
//         description.length < 10 ||
//         description.length > 500 ||
//         // Video URL Length.
//         video_url.length < 10 ||
//         video_url.length > 500
//       ) {
//         return res.status(412).json({
//           status: 412,
//           message: "Invalid field length!!!",
//         });
//       }
//     }

//     // Validate videos.
//     for (const { title, description, video_url } of videos) {
//       // Search if the video exists.
//       const videoExists = await Video.findOne({
//         where: { title: title, description: description, url_video: video_url },
//       });
//       // If the video exists, return an error.
//       if (videoExists) {
//         return res.status(412).json({
//           status: 412,
//           message: `The video ${title} already exists!!!`,
//         });
//       }
//     }

//     // Create the videos.
//     for (const { title, description, video_url } of videos) {
//       // Create the video.
//       const videoCreated = await Video.create({
//         title: title,
//         description: description,
//         url_video: video_url,
//         lessonId: lessonId,
//       });

//       // Add the video to the lesson.
//       const lesson = await Lesson.findByPk(lessonId);
//       await lesson.addVideo(videoCreated);
//     }

//     res.json({
//       status: 200,
//       message: "Videos created successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: 500,
//       message: error.message,
//     });
//   }
// };

// module.exports = postVideo;