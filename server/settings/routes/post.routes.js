// Third Party Dependencies.
const { Router } = require("express");

// Router Instance.
const postRoutes = Router();

postRoutes.post("/", async (req, res) => {
  try {
    res.send("Aqui todos las rutas");
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = postRoutes;
