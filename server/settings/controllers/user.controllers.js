const { Router } = require("express")

const User = require("../../../database/models/User.model");

const routesUser = Router();



routesUser.post("/", async (req, res) => {

    // const {first_name, last_name,user_name,profile_pictures,email,date_birth,is_tutor,is_staff,is_active,about_me}=req.body;

    try {

        res.status(200).send("aqui rutas");

    } catch (error) {
        res.status(404).json(error)
    }

}

)



module.exports = routesUser;