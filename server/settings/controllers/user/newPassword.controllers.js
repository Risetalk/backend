const User = require("../../../../database/models/user.model");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const nuevoPassword = async (req, res) => {
    // recibimos el token que viene por y nueva contraseña por token
    const { token } = req.params;
    const { password } = req.body;
    // buscamos el token en la base de datos
    const user = await User.findOne({ where: { token } })
    //   encritamos la nueva contraseña
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    //   pasamos la contraseña encriptada para que se remplaze la nueva por la vieja contraseña
    user.password = hashedPassword;
    // borramos el token
    user.token = "";
    try {
        // guardamos los cambios del usuario
        await user.save();
        res.json({ msg: 'Password changed successfully' })
    } catch (error) {
        return res.status(403).json({ msg: error.message })
    }
}


module.exports = nuevoPassword