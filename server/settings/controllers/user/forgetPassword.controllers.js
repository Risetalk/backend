const User = require("../../../../database/models/user.model");
const dotenv = require("dotenv");
const generarIdToken = require("../../helper/generarIdToken");
const { olvidePassword } = require("../../helper/envioEmail");
dotenv.config();


// Endpoint password recovery
const olvidePasswordUser = async (req, res) => {
    // user sends account email
    const { email } = req.body
    // We search the database for the email
    const user = await User.findOne({ where: { email } })
    // We validate that the email exists
    if (!user) {
        const error = new Error('Email no existe')
        return res.status(404).json({ msg: error.message })
    }

    try {
        // Let's generate a new token
        user.token = generarIdToken();
        // We save the user in the database
        await user.save();
        // Email sent with instructions for email recovery
        olvidePassword({ user })
        res.json({ msg: 'We have sent an email with the instructions' })
    } catch (error) {
        return res.status(403).json({ msg: error.message })
    }
}

module.exports = olvidePasswordUser