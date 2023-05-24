// Local Dependencies.
const fs = require('fs');
const { cloudinary } = require('../../cloud');
const Category = require('../../../../database/models/category.model')

// Post Category Controller.
const postCategory = async (req, res) => {

    // Destructuring body params.
    const { title, description } = req.body;

    try {

        // If any field is missing.
        if (!title || !description || !req.file) {

            // Delete file.
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }

            // Return message to Missing Fields
            return res.status(412).json({
                status: 412,
                message: 'All fields are required.!!!'
            })

        }

        // Validate field lengths.
        if (title.length < 4 || title.length > 50 || description.length < 10 || description.length > 500) {

            // Delete file.
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }

            return res.status(412).json({
                status: 412,
                message: 'Invalid field length!!!'
            });
        }

        // Search category in categories table.
        const category = await Category.findOne({
            where: {
                title: title
            }
        })

        // If the category exists.
        if (category) {

            // Delete file.
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            // Return message to Category exist.
            return res.status(304).json({
                status: 304,
                message: 'Category is already exists , but has not been modified.!!!'
            })

        }

        // Create Folder to background_image.
        const categoryFolder = `risetalk/categories/${title.toLowerCase().replace(/\s/g, '-')}`;

        // Upload Image to Cloudinary.
        const background_image = await cloudinary.uploader.upload(req.file.path, {
            folder: categoryFolder
        });


        // Create Category.
        await Category.create(
            {
                title,
                description,
                background_image: background_image.secure_url
            }
        )

        // Delete file.
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }

        // Response Created.
        res.status(201).json({
            status: 201,
            message: 'Category Successfully Created.!!!'
        })

    } catch (error) {

        // Delete file.
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }

        // Generic Error.
        res.status(500).json({
            status: error.status,
            message: error.message
        })
    }

}

module.exports = postCategory;