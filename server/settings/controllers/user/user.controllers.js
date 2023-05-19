const User = require("../../../../database/models/user.model");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library")
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const generarIdToken = require("../../helper/generarIdToken");
const { emailRegistro, olvidePassword } = require("../../helper/envioEmail");
dotenv.config();

// cliente id de google que nos permite ingresar a los datos del cliente
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
 
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
            date_birth
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

// Enpoint para mostrar todos lo usuarios
const mostrarUser = async (req, res) => {
    try {
        const user = await User.findAll()
        res.status(200).send(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
// Enponit login Google
const googlelogin = async (req, res) => {
 
    try {
        // pasamos el tokenId de google
        const { tokenId } = req.body;
        // verificamos que el tokenId es valido
        const response = await client.verifyIdToken({ idToken: tokenId, audience: process.env.GOOGLE_CLIENT_ID });
        // destructuramos los datos que queremos 
        const { email_verified, name, given_name, family_name, email, picture } = response.payload;
        // verificamos que el email es valido de que no sea undefined
        if (email_verified && email) {
            // buscamos en la base de satos que exita 
            let user = await User.findOne({ where: { email } });
            // verificamos no exista si no existe los guardamos
            if (!user) {
                // encriptamos la contraseña y concatenamos  el email con la palabra sereta 
                const password = email + process.env.SECRET_KEY;
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(password, salt);
                // creamos una instancia del usuario
                const newUser = new User({ 
                    first_name:given_name, 
                    last_name:family_name, 
                    user_name:name, 
                    profile_picture:picture, 
                    email, 
                    password: hashedPassword, 
                    token: "", 
                    createGoogle: true, 
                    accountConfirmed: email_verified 
                });
                // guardamos el usuario en la base de datos
                user = await newUser.save();
            }
            // generamos token de autenticacion 
            const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
            // desctructuramos los datos que necesitamos
            // const { _id, name: given_name, email: userEmail } = user;
            // console.log(name)
            // mostramos el usuario autenticado
            res.json({
                token,
                user: user._previousDataValues,
            });
        } else {
            return res.status(400).json({ error: "Invalid email" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Something went wrong..." });
    }
};

// Enpoint Confrmacion de la cuenta  
const confirmar = async (req, res) => {
    // recibimos el token que viene por params
    const { token } = req.params;
    // buscamos el token en la base de datos
    const usuarioConfirmar = await User.findOne({ where: { token } })
    // validamos que no este utlizado
    if (!usuarioConfirmar) {
        const error = new Error('Token no valido')
        return res.status(403).json({ msg: error.message })
    }

    try {
        // confirmamos la cuenta
        usuarioConfirmar.accountConfirmed = true;
        //   removemos el token que ya se utilizo
        usuarioConfirmar.token = ""
        //   guardamos los cambios del usuario
        await usuarioConfirmar.save();
        res.status(200).send({ message: 'Usuario confirmado' })
    } catch (error) {
        return res.status(403).json({ msg: error.message })
    }
}
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


module.exports = {
    registroUser,
    mostrarUser,
    login,
    googlelogin,
    confirmar,
    olvidePasswordUser,
    comprobarToken,
    nuevoPassword

};