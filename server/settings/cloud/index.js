// Third Dependencies.
const multer = require('multer'),
    cloudinary = require('cloudinary').v2;

// Environment Variables.
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env

// Cloudinary Configuration.
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
});


// Multer Configuration.
const storage = multer.diskStorage({

    // Destination Folder.
    destination: 'TempFiles/',
    filename: (req, file, cb) => {

      // Generate a Unique filename.
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = file.originalname.split('.').pop();
      cb(null, 'background_' + uniqueSuffix + '.' + extension);
    }
});

// Uploader Files.
const upload = multer({ storage })

module.exports = {
    cloudinary,
    upload
}