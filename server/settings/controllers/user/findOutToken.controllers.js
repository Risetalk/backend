const User = require("../../../../database/models/user.model");
const dotenv = require("dotenv");
dotenv.config()


// Enponit comprobacion de token
const comprobarToken = async (req, res) => {
    // recibimos el token que viene por params
    const { token } = req.params;
    // buscamos el token en la base de datos
    const usuarioConfirmar = await User.findOne({ where: { token } })
    // validamos que no este utlizado
    if (!usuarioConfirmar) {
        const error = new Error('Token no valido')
        return res.status(403).json({ msg: error.message })
    }
    res.json({ msg: 'Token valido' })
}


module.exports = comprobarToken