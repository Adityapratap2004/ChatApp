const mongoose=require('mongoose');
const User = require('./userModel');

const messageSchema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true,
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },

},{timestamps:true});  //createdAt, updateAt

const Message=mongoose.model('Message',messageSchema);
module.exports=Message;