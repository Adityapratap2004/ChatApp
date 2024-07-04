const catchAsyncError = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const User=require('../models/userModel');
const generateTokenAndSetCookie = require('../utils/jwtToken');

exports.register = catchAsyncError(async (req, res, next) => {
    const { fullName, email, password, confirmPassword, gender } = req.body;

    if (password != confirmPassword) {
        return next(new ErrorHandler("Password and confirm password are not same ", 400))
    }

    let user = await User.findOne({ email });

    if (user) {
        return next(new ErrorHandler("User already exists", 400))

    }

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${email}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${email}`;


    user = await User.create({
        fullName,
        email,
        password,
        gender,
        avtar: gender === 'male' ? boyProfilePic : girlProfilePic,
    })

    generateTokenAndSetCookie(user._id,res);

    return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user
    })
})

exports.login = catchAsyncError(async (req, res,next) => {
    
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
    }

    const user=await User.findOne({email}).select("+password");;

    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));
    }
    
    const isPasswordMatched=await user.comparePassword(password);
    
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    generateTokenAndSetCookie(user._id,res);

    res.status(200).json({
        success:true,
        message:"User logged in successfully",
        user
    })
    
});


exports.logout=catchAsyncError(async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:"Logged out"
    })
})


