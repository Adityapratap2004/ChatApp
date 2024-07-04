const express=require('express');
const protectRoute = require('../middleware/protectRoute');
const { sendMessage,getMessage } = require('../controller/messageController');

const router=express.Router();

router.route('/:id').get(protectRoute,getMessage)
router.route('/send/:id').post(protectRoute,sendMessage)

module.exports=router