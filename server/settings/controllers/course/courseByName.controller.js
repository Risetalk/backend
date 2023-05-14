const Course = require("../../../../database/models/course.model")
const Video = require("../../../../database/models/video.model")
const courseByName = async(req, res)=>{
    try {
        if(!req.query.hasOwnProperty("name")) return res.status(404).json({message: "the query must have the name property"})
       
        const {name} = req.query

        const allCourse = await Course.findAll()
        const  allVideo = await Video.findAll()
        let courseWithVideo = []
            
        for(let oneCourse of allCourse){
            let findVideo = allVideo.filter((oneVideo => oneVideo.courseId === oneCourse.id))
            oneCourse.dataValues["video"] = findVideo.length
            courseWithVideo.push(oneCourse)
        }
        
        if(name !== ""){
           
            const courseByName = courseWithVideo.filter((course) => course.title.toLowerCase().includes(name.toLowerCase()) )
            if(courseByName.length === 0) return res.status(404).json({message: "the requested course does not exist"})
            res.status(200).json(courseByName)

        }else if(name.length === 0){
            
            res.status(200).json(allCourse)

        }else{

            res.status(404).json({message: "You are probably entering the wrong property name in the Query or there is no value in the Query"})
        
        }
    } catch (error) {

        res.status(404).json({message: error.message})

    }
}

module.exports = courseByName;