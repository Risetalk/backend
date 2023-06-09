// Third Party Dependencies.
const dotenv = require("dotenv");
dotenv.config();

// Local Dependencies.
const User = require("../../../../database/models/user.model");

// Update User Controller.
const updateUser = async (req, res) => {
  
  try {

    // Get the data that comes in the request body and params.
    const { first_name, last_name, user_name, date_birth } = req.body;
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

    // Check if the username field is filled in.
    if (user_name) {

      // Check if username.
      const user_nameExists = await User.findOne({ where: { user_name } });

      if (user_nameExists) {
        return res.status(403).json({
          status: 403,
          message: "Username is already used",
        });
      }

      // Update username.
      user.user_name = user_name;
    }

    // Check if the first_name field is filled in.
    if (first_name) {

      // Validate first_name.
      if (first_name.length < 2 || first_name.length > 50) {
        return res.status(412).json({
          status: 412,
          message: "First name must be between 2 and 50 characters",
        });
      }

      // Update first_name.
      user.first_name = first_name;
    }

    // Check if the last_name field is filled in.
    if (last_name) {

      // Validate last_name.
      if (last_name.length < 2 || last_name.length > 50) {
        return res.status(412).json({
          status: 412,
          message: "Last name must be between 2 and 50 characters",
        });
      }

      // Update last_name.
      user.last_name = last_name;
    }

    // Check if the date_birth field is filled in.
    if (date_birth) {

      // Validate date_birth (YYYY-MM-DD).
      const date_birthRegex = /^\d{4}-\d{2}-\d{2}$/;

      if (!date_birthRegex.test(date_birth)) {
        return res.status(412).json({
          status: 412,
          message: "Date of birth must be in the format YYYY-MM-DD",
        });
      }

      // Update date_birth.
      user.date_birth = date_birth;
    }

    // Save user.
    await user.save();

    // Return success message.
    return res.status(200).json({
      status: 200,
      message: "User updated successfully",
    });

  } catch (error) {

    // Return error message.
    return res.status(500).json({
      status: 500,
      message: error.message,
    });

  }
};

module.exports = updateUser;
