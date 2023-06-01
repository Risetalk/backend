const nodemailer = require('nodemailer')
require("dotenv").config()


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


        from:'"RiseTalk - Account Manager" <accounts@RiseTalk.com>',
        to: user.dataValues.email,
        subject: 'Confirm Your Account',
        text: 'Check your account on RiseTalk',
        html: `  <table class="table-style" style="width: 100%;">
    <tr class="header-cell"
      style="display: flex;background-color: rgba(255, 255, 255, 0.3);box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.2);width: 100%;">
      <td>
        <img class="logo" src="https://i.ibb.co/zSPCMpn/principal-Logo.png" alt="rise-logo" style="height: 2rem;">
      </td>
    </tr>
    <tr class="main-cell" style="display: flex; height:60vh;">
      <td class="col-main-l" style="margin:0 auto; width: 40%; height:min-content;">
        <h2 class="title" style="font-size: 2rem;font-weight: 800;">Welcome to RiseTalk</h2>
        <p class="paragraph" style="font-weight: 400;width:70%;">
          Get ready for an exceptional educational experience! Discover
          high-quality courses, expert tips, and recommendations that will
          help you grow personally and professionally. Expand your horizons
          and acquire new skills with us.
        </p>
        <a href="${process.env.FRONTEND_URL}/register/confirmated/${user.dataValues.token}" class="btn-confirm"
          style="color: white;background-color: rgb(249, 102, 42);padding: 10px 20px;font-weight: 700;font-size: 1rem;border: none;border-radius: 10px;margin-top: 20px;">Confirm
          Account</a>
      </td>
      <td class="col-main-r" style="position: relative;width: 60%;">
        <img class="background-image" src="https://i.ibb.co/mBrT9xz/light.png" alt="ligtht"
          style="position: absolute;z-index: -1;right: 0;height: 100%;">

      </td>
    </tr>
    <tr class="footer-cell"
      style="display: flex;background-color: rgb(34, 33, 41);color: rgb(127, 122, 141);height: 20vh;">
      <td class="td-footer" style="display: flex;">
        <div class="footer-l" style="width: 40%;">

          <div class="container-logo">
            <img class="logo-footer" src="https://i.ibb.co/q5xQyTS/logofooter.png" alt="footer-logo"
              style="height: 2rem;">

          </div>
          <p class="footer-paragraph" style="font-size: 0.8rem;width: 90%;padding-left: 0.5rem;">
            Where creativity meets commerce - discover a new world of shopping
            in our Polygon-based metaverse marketplace.
          </p>
          <h3 class="terms-footer" style="font-size: 0.8rem;padding: 0.5rem;">© 2023 RiseTalk Technologies Inc.</h3>
        </div>
        <div class="footer-r" style="width: 60%;">

          <ul class="footer-list" style="display: flex;flex-wrap: wrap;list-style: none;text-align: left;padding: 0;">
            <li class="footer-list-item" style="font-size: 0.8rem;margin: 0.5rem;width: 27%;">Contact Us</li>
            <li class="footer-list-item" style="font-size: 0.8rem;margin: 0.5rem;width: 27%;">Help and Support</li>
            <li class="footer-list-item" style="font-size: 0.8rem;margin: 0.5rem;width: 27%;">Terms</li>
            <li class="footer-list-item" style="font-size: 0.8rem;margin: 0.5rem;width: 27%;">Investors</li>
            <li class="footer-list-item" style="font-size: 0.8rem;margin: 0.5rem;width: 27%;">Roadmap</li>
            <li class="footer-list-item" style="font-size: 0.8rem;margin: 0.5rem;width: 27%;">Courses</li>
            <li class="footer-list-item" style="font-size: 0.8rem;margin: 0.5rem;width: 27%;">Careers</li>
            <li class="footer-list-item" style="font-size: 0.8rem;margin: 0.5rem;width: 27%;">Sell on RiseTalk</li>
            <li class="footer-list-item" style="font-size: 0.8rem;margin: 0.5rem;width: 27%;">Privacy Policy</li>
            <li class="footer-list-item" style="font-size: 0.8rem;margin: 0.5rem;width: 27%;">About Us</li>
            <li class="footer-list-item" style="font-size: 0.8rem;margin: 0.5rem;width: 27%;">Affiliates</li>
            <li class="footer-list-item" style="font-size: 0.8rem;margin: 0.5rem;width: 27%;">Sitemap</li>
            <li class="footer-list-item" style="font-size: 0.8rem;margin: 0.5rem;width: 27%;">Coin Market</li>
          </ul>
        </div>
      </td>
    </tr>
  </table>`


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

      html:  `  <table class="table-style" style="width: 100%;">
      <tr class="header-cell"
        style="display: flex;background-color: rgba(255, 255, 255, 0.3);box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.2);width: 100%;">
        <td>
          <img class="logo" src="https://i.ibb.co/zSPCMpn/principal-Logo.png" alt="rise-logo" style="height: 2rem;">
        </td>
      </tr>
      <tr class="main-cell" style="display: flex; height:60vh;">
        <td class="col-main-l" style="margin:0 auto; width: 40%; height:min-content;">
          <h2 class="title" style="font-size: 2rem;font-weight: 800;">Reset Password RiseTalk</h2>
          <p class="paragraph" style="font-weight: 400;width:70%;">
            Get ready for an exceptional educational experience! Discover
            high-quality courses, expert tips, and recommendations that will
            help you grow personally and professionally. Expand your horizons
            and acquire new skills with us.
          </p>
          <a href="${process.env.FRONTEND_URL}/login/forgetpassword/${user.dataValues.token}" class="btn-confirm"
            style="color: white;background-color: rgb(249, 102, 42);padding: 10px 20px;font-weight: 700;font-size: 1rem;border: none;border-radius: 10px;margin-top: 20px;">Confirm
            Account</a>
        </td>
        <td class="col-main-r" style="position: relative;width: 60%;">
          <img class="background-image" src="https://i.ibb.co/mBrT9xz/light.png" alt="ligtht"
            style="position: absolute;z-index: -1;right: 0;height: 100%;">
  
        </td>
      </tr>
      <tr class="footer-cell"
        style="display: flex;background-color: rgb(34, 33, 41);color: rgb(127, 122, 141);height: 20vh;">
        <td class="td-footer" style="display: flex;">
          <div class="footer-l" style="width: 40%;">
  
            <div class="container-logo">
              <img class="logo-footer" src="https://i.ibb.co/q5xQyTS/logofooter.png" alt="footer-logo"
                style="height: 2rem;">
  
            </div>
            <p class="footer-paragraph" style="font-size: 0.8rem;width: 90%;padding-left: 0.5rem;">
              Where creativity meets commerce - discover a new world of shopping
              in our Polygon-based metaverse marketplace.
            </p>
            <h3 class="terms-footer" style="font-size: 0.8rem;padding: 0.5rem;">© 2023 RiseTalk Technologies Inc.</h3>
          </div>
          <div class="footer-r" style="width: 60%;">
  
            <ul class="footer-list" style="display: flex;flex-wrap: wrap;list-style: none;text-align: left;padding: 0;">
              <li class="footer-list-item" style="font-size: 0.8rem;margin: 0.5rem;width: 27%;">Contact Us</li>
              <li class="footer-list-item" style="font-size: 0.8rem;margin: 0.5rem;width: 27%;">Help and Support</li>
              <li class="footer-list-item" style="font-size: 0.8rem;margin: 0.5rem;width: 27%;">Terms</li>
              <li class="footer-list-item" style="font-size: 0.8rem;margin: 0.5rem;width: 27%;">Investors</li>
              <li class="footer-list-item" style="font-size: 0.8rem;margin: 0.5rem;width: 27%;">Roadmap</li>
              <li class="footer-list-item" style="font-size: 0.8rem;margin: 0.5rem;width: 27%;">Courses</li>
              <li class="footer-list-item" style="font-size: 0.8rem;margin: 0.5rem;width: 27%;">Careers</li>
              <li class="footer-list-item" style="font-size: 0.8rem;margin: 0.5rem;width: 27%;">Sell on RiseTalk</li>
              <li class="footer-list-item" style="font-size: 0.8rem;margin: 0.5rem;width: 27%;">Privacy Policy</li>
              <li class="footer-list-item" style="font-size: 0.8rem;margin: 0.5rem;width: 27%;">About Us</li>
              <li class="footer-list-item" style="font-size: 0.8rem;margin: 0.5rem;width: 27%;">Affiliates</li>
              <li class="footer-list-item" style="font-size: 0.8rem;margin: 0.5rem;width: 27%;">Sitemap</li>
              <li class="footer-list-item" style="font-size: 0.8rem;margin: 0.5rem;width: 27%;">Coin Market</li>
            </ul>
          </div>
        </td>
      </tr>
    </table>`

    })
}

module.exports = {emailRegistro, olvidePassword}