const User = require("../../../../database/models/user.model");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const generarIdToken = require("../../helper/generarIdToken");
const { emailRegistro } = require("../../helper/envioEmail");
dotenv.config();

// Enpoint para el registro del usuario
const registroUser = async (req, res) => {
    try {
        // tomamos los datos que vienen por body
        const { first_name, last_name, user_name, email, password, date_birth } = req.body;
        
        // buscamos el usuario por el email 
        const existeUsuario = await User.findOne({ where: { email } })
        // verificamos que este registrado
        if (existeUsuario) {
            return res.status(404).json({ message: "User already exists" })
        }
        // encriptamos la contraseña
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        // creamos una intancia del usuario pasando la contraseña encriptada
        const user = new User({
            first_name,
            last_name,
            user_name,
            email,
            password: hashedPassword,
            date_birth,
            is_tutor: true

        });
        
        // generamos el token de confirmacion del usuario
        user.token = generarIdToken()
        // guardamos el usuario en la base de datos
        await user.save();
        // enviamos el token al correo de usuario
        emailRegistro({ user })
        
        res.status(200).send({ message: 'User created successfully' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = registroUser;