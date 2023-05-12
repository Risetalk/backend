const Course = require("../../../database/models/Course.model")
const {Router} = require("express")

const routesCourse = Router();



routesCourse.post("/", async (req,res)=>{
    try {
     
        const {title, description, background_image, released_date, videos} = req.body
        const course = await Course.create({
            title,
            description,
            background_image,
            released_date
        })

               
        videos.map(async (id)=>{
            await course.addVideo(id)
        })
        
        res.status(200).json(course)
    } catch (error) {
        res.status(404).json(error)
    }
    
}
)
module.exports = routesCourse;