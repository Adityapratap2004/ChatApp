const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt=require('bcryptjs');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Please provide your name']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"]
    },
    password: {
        type: String,
        required: [true, 'Please provide your password'],
        minlength: 6,
        select: false
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    avtar: {
        type: String,
        required: true
    },
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
})

userSchema.methods.comparePassword=async function(enteredPassword){
   
    return await bcrypt.compare(enteredPassword,this.password);
    
}

const User = mongoose.model('User', userSchema);

module.exports = User;