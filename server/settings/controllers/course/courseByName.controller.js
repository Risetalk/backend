const Course = require("../../../../database/models/course.model")

const courseByName = async(req, res)=>{
    try {
        const {name} = req.query
        const allCourse = await Course.findAll()
       
        
        if(req.query.hasOwnProperty("name") && name !== ""){
            
            const courseByName = allCourse.filter((cour) => cour.title.toLowerCase().includes(name.toLowerCase()) )
            if(courseByName.length === 0) return res.status(404).send("the requested course does not exist")
            res.status(200).json(courseByName)
        }else if(name.length === 0){
            
            res.status(200).json(allCourse)
        }else{
            res.status(404).send("You are probably entering the wrong property name in the Query or there is no value in the Query")
        }
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

module.exports = courseByName;