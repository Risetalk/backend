// Third Party Dependencies.
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

// Local Dependencies.
const User = require("../../../../database/models/user.model");

// Login Controller
const userLogin = async (req, res) => {

  try {

    // Get the data that comes in the request body
    const { email, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ where: { email: email } });

    // If the user does not exist, we return an error
    if (!user)
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });

    // Check if the password is correct.
    const isMatch = await bcrypt.compare(password, user.password);

    // If the password is incorrect, we return an error
    if (!isMatch)
      return res.status(404).json({
        status: 413,
        message: "Incorrect password",
      });

    // If the user has not confirmed the account, we return an error
    if (!user.accountConfirmed) {
      return res.status(401).json({
        status: 401,
        message: "Your account has not been confirmed",
      });
    }

    // If the user is not active, we return an error
    if (!user.is_active) {
      return res.status(401).json({
        status: 401,
        message: "Your account is not active",
      });
    }

    // Generate the token.
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    // Data Structure.
    const data = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      user_name: user.user_name,
      email: user.email,
      date_birth: user.date_birth,
      token,
      profile_picture: user.profile_picture,
    };

    // Send the response.
    res.status(200).json({
      status: 200,
      message: "User logged in successfully",
      data,
    });

  } catch (error) {
    
    // Return the error.
    res.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error.message,
    });

  }
};

// Export module.
module.exports = userLogin;
