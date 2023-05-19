// Third Party Dependencies.
const { Router } = require("express");
// Local Dependencies.
const User = require("../../../database/models/user.model");
const { registroUser, login, confirmar, googlelogin, olvidePasswordUser, comprobarToken, nuevoPassword, mostrarUser } = require("../controllers/user/user.controllers");
const verifyToken = require("../middleware/user/jwt");

// Router Instance.
const userRoutes = Router();

userRoutes.get("/", verifyToken, mostrarUser);
// Registrar Usuarios.
userRoutes.post("/register", registroUser);
// Iniciar seccion despues de registrase
userRoutes.post("/login", login);
// confimar cuenta despues de registrase
userRoutes.get("/confirmar/:token", confirmar);
// Autenticarse con google login
userRoutes.post("/googlelogin",  googlelogin);
// recuracion de contraseña envio de email para recuperacion
userRoutes.post("/olvide-password", olvidePasswordUser);
// ingresar contrase la nueva contraseña con token valido
userRoutes.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);


userRoutes.post("/user", async (req, res) => {

  const {
    first_name,
    last_name,
    user_name,
    profile_pictures,
    email,
    date_birth,
    is_tutor,
    is_staff,
    is_active,
    about_me,
  } = req.body;

  try {
    const user = await User.create({
      first_name: first_name,
      last_name: last_name,
      user_name: user_name,
      profile_pictures: profile_pictures,
      email: email,
      date_birth: date_birth,
      is_tutor: is_tutor,
      is_staff: is_staff,
      is_active: is_active,
      about_me: about_me,
    });
    res.status(200).json(user);
  } catch (error) {
    
    res.status(404).json(error);
  }
});


module.exports = userRoutes;
