// Third Party Dependencies.
const { Router } = require("express");

// Local Dependencies.
const postPurchasedCourse = require("../controllers/purchasedCourse/postpurchasedCourse.controller");
const getAllpurchasedCourse = require("../controllers/purchasedCourse/getAllpurchasedCourse.controller");
// Router Instance.
const routesPurchasedCourse = Router();

// Post purchasedCourse Route.
routesPurchasedCourse.post("/", postPurchasedCourse);




routesPurchasedCourse.get("/", getAllpurchasedCourse);




module.exports = routesPurchasedCourse;