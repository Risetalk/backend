const Course  = require("../../../../database/models/course.model")
const Video = require("../../../../database/models/video.model");

const courseById =  async (req,res)=>{
    const {id} = req.params;
    try {

        const courseById = await Course.findOne({where: {id}})
        console.log(courseById.id);


        const allVideoofCourse = await Video.findAll({
            where: {
                courseId: courseById.id
            }
        });

        const allInformationCourse={
            id: courseById.id,
            title: courseById.title,
            description: courseById.description,
            background_image: courseById.background_image,
            released_date: courseById.released_date,
            rating: courseById.rating,
            price: courseById.price,
            video: allVideoofCourse.length,
            createdAt: courseById.createdAt,
            updatedAt: courseById.updatedAt,
        }
 
        res.status(200).send(allInformationCourse)
        
    } catch (error) {

        if(error.message.includes("la sintaxis de entrada no es válida para tipo uuid")){
             return res.status(404).send("The requested id does not exist")
        }

        res.status(404).json({message: error.message})
        
    }
   
}

module.exports = courseById;
