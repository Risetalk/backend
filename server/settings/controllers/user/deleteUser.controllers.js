// Third Party Dependencies.
const dotenv = require("dotenv");
dotenv.config();

// Local Dependencies.
const User = require("../../../../database/models/user.model");

// Delete User Controller.
const deleteUser = async (req, res) => {

  try {

    // Get the data that comes in the request params.
    const { id } = req.params;

    // Check if id field is filled in.
    if (!id) {
      return res.status(412).json({
        status: 412,
        message: "Id field is required",
      });
    }

    // Get User data.
    const user = await User.findByPk(id);

    // If the user does not exist, we return an error.
    if (!user) {
      return res.status(406).json({
        status: 406,
        message: "User does not exist",
      });
    }

    // Change the status of the user to false.
    user.is_active = false;

    // Save the user in the database.
    await user.save();

    // Return a response.
    res.status(200).json({
      status: 200,
      message: "User Account deleted successfully",
    });
  } catch (error) {

    // Return a response.
    res.status(500).json({
      status: 500,
      message: error.message,
    });
    
  }
};

module.exports = deleteUser;
