// Third Party Dependencies.
const { Router } = require("express");

// Local Dependencies.
const postPaymentMethod = require("../controllers/paymentMethod/postPaymentMethod.controller");
const postPaymentIntent = require("../controllers/paymentMethod/postPaymentIntent.controller");
const getPaymentMethodsById = require("../controllers/paymentMethod/getPaymentMethodsById.controller");

// Router Instance.
const paymentMethodRoutes = Router();

//POST method to pay for a course
paymentMethodRoutes.post("/intent",  postPaymentIntent );

// Get payment methods by id.
paymentMethodRoutes.get("/methods", getPaymentMethodsById );

// Post payment method.
paymentMethodRoutes.post("/methods/attach", postPaymentMethod );


module.exports = paymentMethodRoutes;
