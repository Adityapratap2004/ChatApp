
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');

exports.getUsersForSidebar=catchAsyncErrors(async(req,res)=>{
    const loggedInUserId=req.user._id;
    const users=await User.find({_id:{$ne:loggedInUserId}});
    res.status(200).json({
        success:true,
        users
    });
})