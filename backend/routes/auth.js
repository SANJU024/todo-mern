const express= require("express");
const router= express.Router();
const authController = require("../controllers/authController");

//register Route
router.post("/register",authController.registerUser);

//login route
router.post("/login",authController.userLogin);

module.exports=router;