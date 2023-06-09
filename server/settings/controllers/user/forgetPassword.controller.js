// Third Party Dependencies.
const dotenv = require("dotenv");
dotenv.config();

// Local Dependencies.
const User = require("../../../../database/models/user.model");
const generarIdToken = require("../../helper/generarIdToken");
const { olvidePassword } = require("../../helper/envioEmail");


// Forget Password Controller.
const forgetPassword = async (req, res) => {

  try {
    // Get the data that comes in the request body.
    const { email } = req.body;

    // Check if all the fields are filled in.
    if (!email) {
        return res.status(412).json({
        status: 412,
        message: "All fields are required",
        });
    }

    // Check if all the fields are filled in.
    const user = await User.findOne({ where: { email } });

    // If the user already exists, we return an error.
    if (!user) {
      return res.status(406).json({
        status: 406,
        message: "email does not exist",
      });
    }

    // Generate a new token.
    user.token = generarIdToken();

    // Save the user in the database.
    await user.save();

    // Send the email.
    olvidePassword({ user });

    // Return a response.
    res.status(200).json({
      status: 200,
      message: "Your password has been sent to your email",
    });

  } catch (error) {
    
    // Return a response.
    res.status(500).json({
      status: 500,
      message: error.message,
    });

  }
};

module.exports = forgetPassword;
