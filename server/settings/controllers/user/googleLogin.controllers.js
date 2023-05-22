const User = require("../../../../database/models/user.model");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library")
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

// cliente id de google que nos permite ingresar a los datos del cliente
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

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


module.exports = googlelogin;