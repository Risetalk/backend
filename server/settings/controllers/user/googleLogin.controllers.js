// Third Party Dependencies.
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Local Dependencies.
const User = require("../../../../database/models/user.model");

// Login with Google Controller.
const googleLogin = async (req, res) => {

  try {

    // Get the data that comes in the request body
    const { name, email, image } = req.body.user;

    // Check if all the fields are filled in
    if (!name || !email || !image) {
      return res.status(412).json({
        status: 412,
        message: "All fields are required",
      });
    }

    // Check if a user with the same email already exists
    let userVerify = await User.findOne({ where: { email } });

    // If the user does not exist, create a new one
    if (!userVerify) {

      // Create a customer in Stripe
      const customer = await stripe.customers.create({
        name: `${name.split(" ")[0]} ${name.split(" ")[1]}`,
        email,
      });

      // Check if the customer was created successfully
      if (!customer.id) {
        throw new Error("Failed to create customer in Stripe.");
      }

      // Create a password for the user
      const password = email + process.env.SECRET_KEY;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user
      const newUser = new User({
        first_name: name.split(" ")[0],
        last_name: name.split(" ")[1],
        user_name: email.split("@")[0],
        profile_picture: image,
        email,
        password: hashedPassword,
        token: "",
        createGoogle: true,
        accountConfirmed: true,
        customer_id: customer.id,
      });

      // Save the new user in the database
      userVerify = await newUser.save();
    }

    // Create a session token
    const token = jwt.sign({ _id: userVerify._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    // Data Structure to be sent to the client
    const data = {
      id: userVerify.id,
      first_name: userVerify.first_name,
      last_name: userVerify.last_name,
      user_name: userVerify.user_name,
      email: userVerify.email,
      date_birth: userVerify.date_birth,
      token,
      profile_picture: userVerify.profile_picture,
    };

    // Return the user data and the token
    res.status(200).json({
      status: 200,
      message: "User logged in successfully",
      data,
    });
  } catch (error) {

    // Return an error message
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });

  }
};

// Export Module
module.exports = googleLogin;
