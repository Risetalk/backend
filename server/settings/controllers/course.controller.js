const Course = require("../../../database/models/Course.model");
const Video = require("../../../database/models/video.model");

// enpoint para buscas course por id
const GetByNameCourse = async(req, res) =>  {
    const {id } = req.params;
    try {
        const course  = await Course.findByPk(id, {
            include: [{
                model: Video,
                attributes: [],
                through: {
                    attributes: []
                }
            }]
        });
        if(!course) return res.status(404).json({message: "Course not found"})
        res.status(200).json(course.video);
    } catch (error) {
        res.status(404).json({error: error}.message);
    }

}


module.exports = GetByNameCourse;