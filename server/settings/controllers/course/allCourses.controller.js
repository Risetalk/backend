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



// Object with Courses , Lessons and Videos.

// const course =
//   {
//     id: 1, 

//     title: "Curso de React",
//     description: "Aprende React desde cero a nivel profesional",
//     language: "spanish",
//     background_image: "https://i.imgur.com/8JWbZdF.jpg",
//     released_date: "2021-01-01",
//     price: 100,
//     lessons: [
//       {
//         id: 1, 
//         title: "Introducción a React",
//         description: "Aprende React desde cero a nivel profesional", 
//         videos: [
//           {  
//             id: 1,
//             title: "Introducción a React",
//             description: "Aprende React desde cero a nivel profesional",



  
