const User = require("../../../../database/models/user.model");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const generarIdToken = require("../../helper/generarIdToken");
const { emailRegistro } = require("../../helper/envioEmail");
dotenv.config();

// Endpoint for user registration
const registroUser = async (req, res) => {
    try {
        // We take the data that comes by body
        const { first_name, last_name, user_name, email, password, date_birth } = req.body;
        
        // We look for the user by email 
        const existeUsuario = await User.findOne({ where: { email } })
        // We verify that you are registered
        if (existeUsuario) {
            const error = new Error ("User already exists")
             return res.status(404).json({message:error.message})
        }
        // We encrypt the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        // We create an instance of the user by passing the encrypted password
        const user = new User({
            first_name,
            last_name,
            user_name,
            email,
            password: hashedPassword,
            date_birth,
            is_tutor: true

        });
        
        // We generate the user confirmation token
        user.token = generarIdToken()
        // We save the user in the database
        await user.save();
        // We send the token to the user's email
       await emailRegistro(user)
        
        res.status(200).send({ message: 'User created successfully' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = registroUser;