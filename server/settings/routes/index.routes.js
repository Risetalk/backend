const { Router } = require("express");

const routes = Router();


routes.get("/prueba", (req, res) => {
    res.status(200).send("Paso la prueba");
});


module.exports = routes;