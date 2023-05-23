const User = require("../../../../database/models/user.model");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const generarIdToken = require("../../helper/generarIdToken");
const { emailRegistro } = require("../../helper/envioEmail");
dotenv.config();

// Endpoint for user registration
const registroUser = async (req, res) => {
    try {
      // Get the data that comes in the request body
      const { first_name, last_name, user_name, email, password, date_birth } = req.body
  
     // Check if a user with the same username already exists
      const existeUsuario = await User.findOne({ where: { user_name } })
      if (existeUsuario) {
        const error = new Error("Username already exists")
        return res.status(400).json({ error: error.message })
      }
  
      // We check if a user already exists with the same email
      const existeEmail = await User.findOne({ where: { email } })
      if (existeEmail) {
        const error = new Error("Email already exists")
        return res.status(400).json({ error: error.message })
      }
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = new User({
        first_name,
        last_name,
        user_name,
        email,
        password: hashedPassword,
        date_birth,
        is_tutor: true
      });
      user.token = generarIdToken()
      await user.save();
      await emailRegistro(user)
  
      res.status(200).send({ message: 'User created successfully' })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
  


module.exports = registroUser;