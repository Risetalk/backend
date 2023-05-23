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
    const email_confirmation_html = `
<div style="background-color: #F4F4F4; text-align: center; padding: 20px;">
  <img src="https://i.ibb.co/dQLRTZv/risetalk-Logo.png" alt="RiseTalk Logo" style="height: 100px; margin: 0 auto;">
  <div style="background-color: #FFFFFF; width: 80%; margin: 20px auto; text-align: center; padding: 10px 20px;">
    <p style="font-size: 24px;">
    Hello ${user.user.dataValues.first_name}, validate your account in RiseTalk
    </p>
    <p>Your account is almost ready, you just have to check it in the following link:</p>
    <div style="display: inline-block;">
      <a href="${process.env.FRONTEND_URL}/user/confirmar/${user.user.dataValues.token}" style="color: black; text-decoration: none;">
        <span style="display: inline-block; margin: 10px auto; background-color: #F0713D; border: 2px solid #F35210; padding: 8px; border-radius: 5px;">
          <span style="display: inline-block; cursor: pointer;">Confirm Account</span>
        </span>
      </a>
    </div>
    <p>If you did not request the validation of your account, you can ignore the message</p>
  </div>
</div>
`;
      await transport.sendMail({
        from:'"RiseTalk - Account Manager" <accounts@RiseTalk.com>',
        to: user.user.dataValues.email,
        subject: 'Confirm Your Account',
        text: 'Check your account on RiseTalk',
        html: email_confirmation_html
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
    const password_reset_html = `
<div style="background-color: #F4F4F4; text-align: center; padding: 20px;">
  <img src="https://i.ibb.co/dQLRTZv/risetalk-Logo.png" alt="RiseTalk Logo" style="height: 100px; margin: 0 auto;">
  <div style="background-color: #FFFFFF; width: 80%; margin: 20px auto; text-align: center; padding: 10px 20px;">
    <p style="font-size: 24px;">Hello ${user.user.dataValues.first_name} you have requested to reset your RiseTalk password</p>
    <p>Follow the link below to generate a new password:</p>
    <div style="display: inline-block;">
      <a href="${process.env.FRONTEND_URL}/login/forgetpassword/${user.user.dataValues.token}" style="color: black; text-decoration: none;">
        <span style="display: inline-block; margin: 10px auto; background-color: #F0713D; border: 2px solid #F35210; padding: 8px; border-radius: 5px;">
          <span style="display: inline-block; cursor: pointer;">Reset Password</span>
        </span>
      </a>
    </div>
    <p>If you did not request to reset the password, you can ignore the message</p>
  </div>
</div>
`;

    await transport.sendMail({
      from:'"RiseTalk - Administrador de cuentas" <cuentas@RiseTalk.com>',
      to: user.user.dataValues.email,
      subject: 'RiseTalk - Restablece tu Contraseña',
      text: 'Restablece tu Contraseña',
      html: password_reset_html
    })
}

module.exports = {emailRegistro, olvidePassword}