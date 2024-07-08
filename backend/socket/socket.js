const {Server}=require('socket.io');
const http=require('http');
const express=require('express');

const app=express();

const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:["http://localhost:3000"],
        methods:["GET","POST"],
    }
});



const userSocketMap={}  //{userId: socketId}

const getReceiverSocketId=(receiverId)=>{
    return userSocketMap[receiverId];

}
 
io.on('connection',(socket)=>{    //socket is the user that is connected
    console.log("A user connected",socket.id)

    const userId=socket.handshake.query.userId;

    if(userId!=="undefined"){
        userSocketMap[userId]=socket.id;
    }

    //io.emot() is used to send events to all the connected clients
    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    //socket.on() is used to listen to the events. can be both onclient and server side
    socket.on('disconnect',()=>{
        console.log("A user disconnected",socket.id)
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })
})



module.exports={app,io,server,getReceiverSocketId};