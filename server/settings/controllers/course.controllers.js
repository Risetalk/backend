
const Course = require("../../../database/models/Course.model")
const User=require("../../../database/models/User.model");
const Video=require("../../../database/models/video.model");
const { Router } = require("express")

const routesCourse = Router();



routesCourse.post("/", async (req, res) => {
    
    const { title, description, background_image, released_date, rating,price } = req.body
    const {idUser}=req.query;
    try {

        const user=await User.findByPk(idUser);
        if(!user) return res.status(400).json({error:"User not found"});
        const userSearch = await User.findByPk(idUser, {
            include: [{
                model: Course,
                attributes: ['title'],
                through: {
                    attributes: []
                }
            }
            ]
        });

        const userCourses = userSearch.courses;

        console.log("esto es antes del for")

        let bandera = false;
        console.log(userCourses.length);
        for (let i = 0; i < userCourses.length; i++) {
            console.log("entro al for")
            if (userCourses[i].dataValues.title.toLowerCase() === title.toLowerCase()) {
                bandera = true;
                i = userCourses.length;
            }
        }

        console.log("Esto es despues del for");

        if (bandera) return res.status(400).json({ error: "El curso ya esta agregado!" })
        console.log("Esto despues de la condicion");

        const course = await Course.create({
            title,
            description,
            background_image,
            rating,
            price,
            released_date
        });

        console.log("paso de aqui")
        console.log(idUser)
        course.addUser(idUser);

        res.status(200).json(course);
    
    } catch (error) {
        res.status(404).json(error)
    }

}



)



module.exports = routesCourse;