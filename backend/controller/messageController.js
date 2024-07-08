const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const { io,getReceiverSocketId } = require("../socket/socket");


exports.sendMessage = catchAsyncErrors(async (req, res, next) => {
    const { message } = req.body;
    const senderId = req.user._id;
    const receiverId = req.params.id;

    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId],
        })
    }

    const newMessage = new Message({
        senderId,
        receiverId,
        message,
    })

    if (newMessage) {
        conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId=getReceiverSocketId(receiverId);
    if(receiverSocketId){
        // io.to (<socket_id>).emit() used to send events to specific client
        io.to(receiverSocketId).emit("newMessage",newMessage);
    }

    return res.status(200).json({
        success: true,
        message: "Message sent successfully",
        newMessage
    })

})


exports.getMessage = catchAsyncErrors(async (req, res) => {
    const userToChatId = req.params.id;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
        participants: { $all: [senderId, userToChatId] },
    }).populate('messages');

    if (!conversation) {
        return res.status(200).json({
            success: true,
            message: "No conversation found",
            messages: [],
        })
    }

    const messages = conversation.messages;

    return res.status(200).json({
        success: true,
        message: "Conversation found",
        messages,
    })


})