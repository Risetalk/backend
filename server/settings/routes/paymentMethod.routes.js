

// Third Party Dependencies.
const { Router } = require("express");

// Local Dependencies.
const PaymentMethodPost = require("../controllers/patmentMethod/paymentMethod.controllers")

// Router Instance.
const paymentMethodRoutes = Router();

//POST method to pay for a course
paymentMethodRoutes.post("/", PaymentMethodPost );

module.exports = paymentMethodRoutes;
