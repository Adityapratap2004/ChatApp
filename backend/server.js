const express=require('express');
const dotenv=require('dotenv')
const cookieParser = require('cookie-parser');



const authRoute=require('./routes/authRoutes')
const errorMiddleware=require('./middleware/error');
const messageRoutes=require('./routes/messageRoutes')
const userRoutes=require('./routes/userRoutes')
const connectDB = require('./config/db');
const {app, server}=require('./socket/socket')



dotenv.config(); 
const PORT=process.env.PORT

//to connect to database
connectDB();



//Handling Uncaught Exception
process.on('uncaughtException',err=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
    process.exit(1);
})

//middleware

app.use(express.json()); 
app.use(cookieParser())  

//Routes

app.use("/api/auth",authRoute);
app.use("/api/message",messageRoutes);
app.use('/api/user',userRoutes)

//Error Middleware
app.use(errorMiddleware);

server.listen(5000,()=>{
    console.log(`server started on port ${PORT}`);
})

//Handle unhandled promise rejections
process.on('unhandledRejection',err=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);
    server.close(()=>{
        process.exit(1);
    })
})
