const User = require('../models/userModel');
const catchAsyncErrors=require('./catchAsyncErrors')
const jwt=require('jsonwebtoken');

const protectRoute=catchAsyncErrors(async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return res.status(401).json({message:"Login first to access this route"});
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET);

    if(!decoded){
        return res.status(401).json({message:"Login first to access this route"});
    }

    
    const user=await User.findById(decoded.id);
    if(!user){
        return res.status(401).json({message:"Login first to access this route"});
    }
    req.user=user;

    next();

})


module.exports=protectRoute