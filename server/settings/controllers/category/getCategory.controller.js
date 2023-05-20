// Local Dependencies.
const Category = require("../../../../database/models/category.model")

// Get Category and Categories.
const getCategory = async (req, res) => {

    // Destructuring query params.
    const { title } = req.query

    try {

        // If title exists.
        if (title) {

            // Search Category by title
            const category = await Category.findOne({
                where: {
                    title: title
                }
            })

            // If category was found.
            if (category) {

                // Return Category.
                return res.status(200).json({
                    status: 200,
                    result: category
                })

            }

            // Return Category not found.
            return res.status(404).json({
                status: 404,
                message: 'Category not found.!!!'
            })

        }

        // Find All Categories.
        const categories = await Category.findAll()

        // Return All Categories.
        res.status(200).json({
            status: 200,
            result: categories
        })

    } catch (error) {
        res.status(500).json({
            status: error.status,
            message: error.message
        })
    }

}

module.exports = getCategory;