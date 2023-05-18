// Local Dependencies.
const Course = require("../../../../database/models/course.model");


const allCourses = async (req, res, next) => {

  if (!req.query.id) {

    try {

      const courses = await Course.findAll();

      res.status(200).json(courses);

    } catch (error) {

      res.status(404).json({ message: error.message });
    }
  } else {
    next();
  }

};

module.exports = allCourses;
