// Third Party Dependencies.
const dotenv = require("dotenv");
dotenv.config();

// Local Dependencies.
const User = require("../../../../database/models/user.model");

// Confirm Account Controller
const confirmAccount = async (req, res) => {

  try {
    
    // Get the token from the request params.
    const { token } = req.params;

    // Find the user in the database
    const confirmUser = await User.findOne({ where: { token } });

    // If the user does not exist, we return an error
    if (!confirmUser) {
      // Return an error.
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    // If the user has already confirmed the account, we return an error
    if (confirmUser.accountConfirmed) {
      // Return an error.
      return res.status(401).json({
        status: 401,
        message: "Your account has already been confirmed",
      });
    }

    // If the user is not active, we return an error
    if (!confirmUser.is_active) {
      // Return an error.
      return res.status(401).json({
        status: 401,
        message: "Your account is not active",
      });
    }

    // Set the accountConfirmed property to true.
    confirmUser.accountConfirmed = true;

    // Set the token to an empty string.
    confirmUser.token = "";

    // Save the user in the database.
    await confirmUser.save();

    // Return a success message.
    res.status(200).json({
      status: 200,
      message: "Your account has been confirmed successfully",
    });
  } catch (error) {
    // Return an error.
    res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

// Export module
module.exports = confirmAccount;
