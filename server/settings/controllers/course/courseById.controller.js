const Course  = require("../../../../database/models/course.model")

const courseById =  async (req,res)=>{
    const {id} = req.params;
    try {

        const courseById = await Course.findOne({where: {id}})
        res.status(200).send(courseById)
        
    } catch (error) {

        if(error.message.includes("la sintaxis de entrada no es válida para tipo uuid")){
             return res.status(404).send("The requested id does not exist")
        }

        res.status(404).json({message: error.message})
        
    }
   
}

module.exports = courseById;
