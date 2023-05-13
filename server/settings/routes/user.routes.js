const { Router } = require("express")

const User = require("../../../database/models/User.model");

const routesUser = Router();



routesUser.post("/", async (req, res) => {

    //Esto es una sacha ruta
    const { first_name, last_name, user_name, profile_pictures, email, date_birth, is_tutor, is_staff, is_active, about_me } = req.body;

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
            about_me: about_me

        })
        res.status(200).json(user);

    } catch (error) {
        res.status(404).json(error)
    }

}

);


// routesUser.post("/", async (req, res) => {

//      //const {first_name, last_name,user_name,profile_pictures,email,date_birth,is_tutor,is_staff,is_active,about_me}=req.body;

//     try {

//         res.status(200).send("aqui rutas");

//     } catch (error) {
//         res.status(404).json(error)
//     }

// }

// )



module.exports = routesUser;