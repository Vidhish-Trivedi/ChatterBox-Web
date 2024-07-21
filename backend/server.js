import express from 'express';
import {app, server} from './socket/socket.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import connectToDB from './db/connectToDB.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

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

app.use(express.static(path.join(__dirname, '/frontend/dist')));

// Wildcard Route to serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/dist/index.html'));
});

server.listen(PORT, () => {
    connectToDB();
    console.log(`Server running on port ${PORT}`)
});
