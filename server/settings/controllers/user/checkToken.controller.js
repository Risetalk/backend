// Third Party Dependencies.
const dotenv = require("dotenv");
dotenv.config();

// Local Dependencies.
const User = require("../../../../database/models/user.model");

// Check Token Controller.
const checkToken = async (req, res) => {

  try {
    
    // Get the data that comes in the request body.
    const { token } = req.params;

    // Check if all the fields are filled in.
    if (!token) {
      return res.status(412).json({
        status: 412,
        message: "All fields are required",
      });
    }

    // Find the user in the database.
    const user = await User.findOne({ where: { token } });

    // If the user does not exist, we return an error.
    if (!user) {
      return res.status(406).json({
        status: 406,
        message: "User does not exist",
      });
    }

    // Return a response.
    res.status(200).json({
      status: 200,
      message: "Token correct",
    });
  } catch (error) {
    // Return a response.
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

// Export Module.
module.exports = checkToken;
