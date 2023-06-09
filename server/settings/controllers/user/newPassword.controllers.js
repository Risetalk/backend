const User = require("../../../../database/models/user.model");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

//put new password
const nuevoPassword = async (req, res) => {
    // We receive the token that comes by and new password by token
    const { token } = req.params;
    const { password } = req.body;
    // We look for the token in the database
    const user = await User.findOne({ where: { token } })
    // We write the new password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // We pass the encrypted password so that the new one is replaced by the old password
    user.password = hashedPassword;
    // We delete the token
    user.token = "";
    try {
        // We save the user's changes
        await user.save();
        res.json({ msg: 'Password changed successfully' })
    } catch (error) {
        return res.status(403).json({ msg: error.message })
    }
}


module.exports = nuevoPassword