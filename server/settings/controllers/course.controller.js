const Course = require("../../../database/models/Course.model");

// enpoint para buscas course por id
const GetByNameCourse = async(req, res) =>  {
    const {id } = req.params;

    try {
        const course = await Course.findByPk(id, {
            include: [
                {
                    Model: nameTable,
                    attributes: [""],
                    through: {
                        attributes: []
                    }
                }
            ]
        });
        if(!course) return res.status(404).json({message: "Course not found"})
        res.status(200).json({message:id});
    } catch (error) {
        res.status(404).json({error: error}.message);
    }

}


module.exports = GetByNameCourse;