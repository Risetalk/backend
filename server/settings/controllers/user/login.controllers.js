const User = require("../../../../database/models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();


// Enpoint para el login del usuario
const login = async (req, res) => {
    try {
        // tomamos los datos que viene por body
        const { email, password } = req.body;
        // buscamos el usuario por el email
        const user = await User.findOne({ where: { email: email } });
        // veficamos que no exista
        if (!user) return res.status(404).json({ message: "User not exist" })
        // comparamos la contraseña de base de datos con la que el usuario nos manda
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(404).json({ message: "Password incorrect" })
        // confirmamos que sean correctas
        if (!user.accountConfirmed) {
            const error = new Error('Tu usuario no ha sido confirmado')
            return res.status(403).json({ msg: error.message })
        }
        // generamos el token de autentificacion
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: "1h" })
        // mostrasmos los datod del usuario autenticado
        res.status(200).send({ token, user })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = login;