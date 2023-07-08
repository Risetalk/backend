// Third Party Dependencies.
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

// Local Dependencies.
const User = require("../../../../database/models/user.model");

// New Password Controller.
const newPassword = async (req, res) => {
    
  try {

    // Get the data that comes in the request body and params.
    const { password } = req.body;
    const { token } = req.params;

    // Check if all the fields are filled in.
    if (!password || !token) {
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

    // Generate a new salt.
    const salt = await bcrypt.genSalt();

    // Encrypt the password.
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the user password and token in the database.
    user.password = hashedPassword;

    // Set the token to an empty string.
    user.token = "";

    // Save the user in the database.
    await user.save();

    // Return a response.
    res.status(200).json({
      status: 200,
      message: "Password updated successfully",
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
module.exports = newPassword;
