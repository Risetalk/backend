const User = require("../../../../database/models/user.model");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const generarIdToken = require("../../helper/generarIdToken");
const { emailRegistro } = require("../../helper/envioEmail");
// stripe import 
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

dotenv.config();


// PostUser Controller
const userRegister = async (req, res) => {
    try {

      // Get the data that comes in the request body
      const { first_name, last_name, user_name, email, password, date_birth } = req.body
  
     // Check if a user with the same username already exists
      const userVerify = await User.findOne({
        where: {
          user_name: user_name,
        },
      });

      // If the user already exists, we return an error
      if (userVerify) {
        return res.status(406).json(
          {
            status:406,
            message: "username already exists",
          }
        )
      }

      // Check if a user with the same email already exists
      const emailVerify = await User.findOne({
        where: {
          email: email,
        },
      });

      // If the user already exists, we return an error
      if (emailVerify) {
        return res.status(406).json(
          {
            status:406,
            message: "email already exists",
          }
        )
      }

      // Hash the password
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create customer in Stripe.
      const customer = await stripe.customers.create({
        name: `${first_name} ${last_name}`,
        email: email,
      });

      // Validate the Customer object.
      if (!customer.id) {
        throw new Error("Failed to create customer in Stripe.");
      }

      // Create user in database.
      const user = new User({
        first_name,
        last_name,
        user_name,
        email,
        password: hashedPassword,
        date_birth,
        customer_id: customer.id,
        is_tutor: true
      });

      // Generate token
      user.token = generarIdToken()

      // Save user in database
      await user.save();

      // Send email
      await emailRegistro(user)
  
      res.status(201).send(
        {
          status:201,
          message: "User created successfully",
          data: user,
        }
      )
    } catch (error) {
      
      // Return error message
      res.status(500).send(
        {
          status:500,
          message: error.message,
        }
      )

    }
  }
  


module.exports = userRegister;