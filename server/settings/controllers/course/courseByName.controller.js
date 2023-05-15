const Course = require("../../../../database/models/course.model")

const courseByName = async(req, res)=>{
    try {

        const {name} = req.query
        const allCourse = await Course.findAll()
        
        
        if(req.query.hasOwnProperty("name") && name !== ""){
            
            const courseByName = allCourse.filter((cour) => cour.title.toLowerCase().includes(name.toLowerCase()) )
            if(courseByName.length === 0) return res.status(404).json({message: "No course found with that name"})
            res.status(200).json(courseByName)

        }else if(name === ""){
            
            res.status(200).json(allCourse)

        }else if(Object.keys(req.query).length === 0)res.status(200).json(allCourse)
        else{
            res.status(404).json({message : `The property '${Object.keys(req.query)}' in the query is incorrect, try entering 'name'`})
        
        }
    } catch (error) {

        res.status(404).json({message: error.message})

    }
}

module.exports = courseByName;