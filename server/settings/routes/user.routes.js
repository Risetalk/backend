// Third Party Dependencies.
const { Router } = require("express");
// Local Dependencies.
const verifyToken = require("../middleware/user/jwt");
const registroUser = require("../controllers/user/register.controllers");
const login = require("../controllers/user/login.controllers");
const googlelogin = require("../controllers/user/googleLogin.controllers");
const confirmar = require("../controllers/user/confirmAccount.controllers");
const olvidePasswordUser = require("../controllers/user/forgetPassword.controllers");
const comprobarToken = require("../controllers/user/findOutToken.controllers");
const nuevoPassword = require("../controllers/user/newPassword.controllers");

// Router Instance.
const userRoutes = Router();

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


module.exports = userRoutes;
