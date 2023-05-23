const nodemailer = require('nodemailer')
require("dotenv").config()

// We use nodemailer to make the send email function to confirm the user
const emailRegistro = async(user) => {

    const transport = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.CORREO, // generated ethereal user
            pass: process.env.CONTRASENIA_GMAIL_APLICACION // generated ethereal password
        }
    })
      await transport.sendMail({
        from:'"RiseTalk - Administrador de Cuentas" <cuentas@RiseTalk.com>',
        to: user.dataValues.email,
        subject: 'Confirma Tu Cuenta',
        text: 'Comprueba tu cuenta en RiseTalk',
        html:`<P>Hola: ${user.dataValues.first_name } Comprueba tu cuenta en RiseTalk</P>
        <p>Tu cuenta ya esta casi lista solo debes comprobarla en el siguiente enlace:</p>
        <a href="${process.env.FRONTEND_URL}/register/confirmated/${user.dataValues.token}">Confirma Cuenta</a>
        <p>Si tu no confirmaste tu cuenta, puedes ignorar el mensaje</p>
        `
      })
}

// We use nodemailer to send email function to change user password
const olvidePassword = async(user) => {
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: false,
    port: 587,
    auth: {
      user: process.env.CORREO,
      pass: process.env.CONTRASENIA_GMAIL_APLICACION,
    }
    });

    await transport.sendMail({
      from:'"RiseTalk - Administrador de cuentas" <cuentas@RiseTalk.com>',
      to: user.dataValues.email,
      subject: 'RiseTalk - Restablece tu Contraseña',
      text: 'Restablece tu Contraseña',
      html:`<P>Hola: ${user.dataValues.name} has solicitado reestablecer tu contraseña en RiseTalk</P>
      <p>Sigue el siguinete enlace para generar un nueva contraseña:</p>
      <a href="${process.env.FRONTEND_URL}/login/forgetpassword/${user.user.dataValues.token}">Reestablecer Contraseña</a>
      <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>
      `
    })
}

module.exports = {emailRegistro, olvidePassword}