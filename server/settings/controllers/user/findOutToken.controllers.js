const User = require("../../../../database/models/user.model");
const dotenv = require("dotenv");
dotenv.config()


// Enponit token check
const comprobarToken = async (req, res) => {
    /// We receive the token that comes from params
    const { token } = req.params;
    // We look for the token in the database
    const usuarioConfirmar = await User.findOne({ where: { token } })
    // We validate that it is not used
    if (!usuarioConfirmar) {
        const error = new Error('Token no valido')
        return res.status(403).json({ msg: error.message })
    }
    res.json({ msg: 'Token valido' })
}


module.exports = comprobarToken