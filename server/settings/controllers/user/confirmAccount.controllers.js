const User = require("../../../../database/models/user.model");
const dotenv = require("dotenv");
dotenv.config();

// Enpoint Confrmacion de la cuenta  
const confirmar = async (req, res) => {
    // recibimos el token que viene por params
    const { token } = req.params;
    // buscamos el token en la base de datos
    const usuarioConfirmar = await User.findOne({ where: { token } })
    // validamos que no este utlizado
    if (!usuarioConfirmar) {
        const error = new Error('invalid token')
        return res.status(403).json({ msg: error.message })
    }
    
    try {
        // confirmamos la cuenta
        usuarioConfirmar.accountConfirmed = true;
        //   removemos el token que ya se utilizo
        usuarioConfirmar.token = ""
        //   guardamos los cambios del usuario
        await usuarioConfirmar.save();
        res.status(200).send({ message: 'confirmed user' })
    } catch (error) {
        return res.status(403).json({ msg: error.message })
    }
}

module.exports = confirmar;