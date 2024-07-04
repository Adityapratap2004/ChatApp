const express=require('express');
const { login, register, logout } = require('../controller/authController');
const router=express.Router();

router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/register").post(register);

module.exports=router;