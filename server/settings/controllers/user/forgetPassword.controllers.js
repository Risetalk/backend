const User = require("../../../../database/models/user.model");
const dotenv = require("dotenv");
const generarIdToken = require("../../helper/generarIdToken");
const { olvidePassword } = require("../../helper/envioEmail");
dotenv.config();


// Enpoint recupreaacin de password
const olvidePasswordUser = async (req, res) => {
    // usuario envia email de la cuenta
    const { email } = req.body
    // buscamos en la base de datos el email
    const user = await User.findOne({ where: { email } })
    // validamos de que exista el email
    if (!user) {
        const error = new Error('Email no existe')
        return res.status(404).json({ msg: error.message })
    }

    try {
        // genermos un nuevo token
        user.token = generarIdToken();
        // guardamos el usuario en la base de datos
        await user.save();
        //   envio de email con las intrucciones para la recuperacion del email
        olvidePassword({ user })
        res.json({ msg: 'We have sent an email with the instructions' })
    } catch (error) {
        return res.status(403).json({ msg: error.message })
    }
}

module.exports = olvidePasswordUser