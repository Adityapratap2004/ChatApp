const express=require('express');
const { getUsersForSidebar } = require('../controller/userController');
const protectRoute = require('../middleware/protectRoute');
const router=express.Router();

router.route('/').get(protectRoute,getUsersForSidebar)

module.exports=router;