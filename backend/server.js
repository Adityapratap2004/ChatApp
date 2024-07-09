const path = require('path');
const express = require('express');
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');



const authRoute = require('./routes/authRoutes')
const errorMiddleware = require('./middleware/error');
const messageRoutes = require('./routes/messageRoutes')
const userRoutes = require('./routes/userRoutes')
const connectDB = require('./config/db');
const { app, server } = require('./socket/socket')



dotenv.config();
const PORT = process.env.PORT || 5000

__dirname=path.resolve();


//to connect to database
connectDB();



//Handling Uncaught Exception
process.on('uncaughtException', err => {
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
    process.exit(1);
})

//middleware

app.use(express.json());
app.use(cookieParser());


// API endpoint to provide backend URL for socket
app.get('/env', (req, res) => {
    res.json({
        SocketURL: process.env.SOCKET_URL_FOR_FRONTEND || '',
    });
});


//Routes

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoutes);
app.use('/api/user', userRoutes)

//Error Middleware
app.use(errorMiddleware);

// Serve static files from frontend
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});



server.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
})

//Handle unhandled promise rejections
process.on('unhandledRejection', err => {
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);
    server.close(() => {
        process.exit(1);
    })
})
