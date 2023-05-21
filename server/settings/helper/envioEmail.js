const nodemailer = require('nodemailer')
require("dotenv").config()

// utilizamos nodemailer para hacer el envio de email funcion para confirmar el usuario
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
        to: user.user.dataValues.email,
        subject: 'Confirma Tu Cuenta',
        text: 'Comprueba tu cuenta en RiseTalk',
        html:`<P>Hola: ${user.user.dataValues.first_name } Comprueba tu cuenta en RiseTalk</P>
        <p>Tu cuenta ya esta casi lista solo debes comprobarla en el siguiente enlace:</p>
        <a href="${process.env.FRONTEND_URL}/user/confirmar/${user.user.dataValues.token}">Confirma Cuenta</a>
        <p>Si tu no confirmaste tu cuenta, puedes ignorar el mensaje</p>
        `
      })
}

// utilizamos nodemailer para hacer el envio de email funcion para cambiar contraseña del usuario
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
      to: user.user.dataValues.email,
      subject: 'RiseTalk - Restablece tu Contraseña',
      text: 'Restablece tu Contraseña',
      html:`<P>Hola: ${user.user.dataValues.name} has solicitado reestablecer tu contraseña en RiseTalk</P>
      <p>Sigue el siguinete enlace para generar un nueva contraseña:</p>
      <a href="${process.env.FRONTEND_URL}/user/olvide-password/${user.user.dataValues.token}">Reestablecer Contraseña</a>
      <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>
      `
    })
}

module.exports = {emailRegistro, olvidePassword}