const express = require("express");
const router = express.Router();
const userController = require("../controllers/useController")

//login routes

router.post("/login", userController.loginUser);
// register routes

router.post("/register", userController.registerUser);

module.exports = router