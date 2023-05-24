// Third Party Dependencies.
const { Router } = require("express");

// Local Dependencies.
const { upload, cloudinary } = require("../cloud");
const postCategory = require("../controllers/category/postCategory.controller");
const getCategory = require("../controllers/category/getCategory.controller");

// Router Instance.
const categoryRoutes = Router();


// Category Post.
categoryRoutes.post('/', upload.single('category_image'), postCategory)

// Category Get.
categoryRoutes.get('/', getCategory)


module.exports = categoryRoutes;