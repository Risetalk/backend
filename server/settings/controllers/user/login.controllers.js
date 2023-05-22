const User = require("../../../../database/models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();


// Enpoint for user login
const login = async (req, res) => {
    try {
        // We take the data that comes by body
        const { email, password } = req.body;
        // We look for the user by email
        const user = await User.findOne({ where: { email: email } });
        // We verify that it does not exist
        if (!user) return res.status(404).json({ message: "User not exist" })
        // We compare the database password with the one the user sends us
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(404).json({ message: "Password incorrect" })
        // We confirm that they are correct
        if (!user.accountConfirmed) {
            const error = new Error('Tu usuario no ha sido confirmado')
            return res.status(403).json({ msg: error.message })
        }
        // Generate the authentication token
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: "1h" })
        // We show the data of the authenticated user
        res.status(200).send({ token, user })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = login;