const mongoose=require('mongoose');

const conversationSchema=new mongoose.Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        }
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Message',
            default:[]
        }
    
    ],
},{timestamps:true});  //createdAt, updateAt


const Conversation=mongoose.model('Conversation',conversationSchema);

module.exports=Conversation;