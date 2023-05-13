const Course = require("../../../../database/models/course.model");
const User = require("../../../../database/models/user.model");

const postCourse = async (req, res) => {
  const { title, description, background_image, released_date, rating, price } =
    req.body;
  const { idUser } = req.query;
  try {
    const user = await User.findByPk(idUser);
    if (!user) return res.status(400).json({ error: "User not found" });
    if (!user.is_tutor)
      return res
        .status(400)
        .json({ error: "You are not validated to create content" });
    else if (!user.is_active)
      return res.status(400).json({ error: "Is not active" });
    const userSearch = await User.findByPk(idUser, {
      include: [
        {
          model: Course,
          attributes: ["title"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    const userCourses = userSearch.courses;
    let bandera = false;
    console.log(userCourses.length);
    for (let i = 0; i < userCourses.length; i++) {
      console.log("entro al for");
      if (
        userCourses[i].dataValues.title.toLowerCase() === title.toLowerCase()
      ) {
        bandera = true;
        i = userCourses.length;
      }
    }

    if (bandera)
      return res.status(400).json({ error: "The course already exists!" });

    const course = await Course.create({
      title,
      description,
      background_image,
      rating,
      price,
      released_date,
    });

    course.addUser(idUser);
    res.status(200).json(course);
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = postCourses;
