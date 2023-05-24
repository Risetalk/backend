const nodemailer = require('nodemailer')
require("dotenv").config()
const path = require('path');
const fs = require('fs');

// Obtén la ruta absoluta al archivo HTML
const htmlFilePath = path.resolve(__dirname, 'ValidateEmail.html');
const cssFilePath = path.resolve(__dirname, 'style.css');
// Lee el contenido del archivo HTML
const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
const cssContent = fs.readFileSync(cssFilePath, "utf-8")
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
    
const htmladdcss = htmlContent.replace(/<style>[\s\S]*<\/style>/, `<style>${cssContent}</style>`)

console.log(htmladdcss);

      await transport.sendMail({
        from:'"RiseTalk - Account Manager" <accounts@RiseTalk.com>',
        to: user.user.dataValues.email,
        subject: 'Confirm Your Account',
        text: 'Check your account on RiseTalk',
        html: htmladdcss
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
      html: password_reset_html
    })
}

module.exports = {emailRegistro, olvidePassword}