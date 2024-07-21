import express from 'express';
import {app, server} from './socket/socket.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import connectToDB from './db/connectToDB.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON data from request body
app.use(express.json());
// Middleware to parse cookies from request headers
app.use(cookieParser());

// Auth Routes using middleware
app.use("/api/auth", authRoutes);
// Message Routes using middleware
app.use("/api/messages", messageRoutes);
// User Routes using middleware
app.use("/api/users", userRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("API is running...");
});

server.listen(PORT, () => {
    connectToDB();
    console.log(`Server running on port ${PORT}`)
});
