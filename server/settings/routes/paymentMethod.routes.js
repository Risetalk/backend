// Third Party Dependencies.
const { Router } = require("express");

// Local Dependencies.
const postFinalPayment = require("../controllers/paymentMethod/postFinalPayment.controller");

const configPayment = require("../controllers/paymentMethod/configPayment.controller");

// Router Instance.
//const paymentMethodRoutes = Router();

//POST method to pay for a course
paymentMethodRoutes.post("/create-payment", postFinalPayment);

// Get payment methods by id.
paymentMethodRoutes.get("/config", configPayment);

// Post payment method.
//paymentMethodRoutes.post("/methods/attach", postPaymentMethod );


module.exports = paymentMethodRoutes;
