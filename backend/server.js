import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import connectToDB from './db/connectToDB.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

// Middleware to parse JSON data from request body
app.use(express.json());

// Auth Routes using middleware
app.use("/api/auth", authRoutes);


// Home Route
app.get("/", (req, res) => {
    res.send("API is running...");
});

app.listen(PORT, () => {
    connectToDB();
    console.log(`Server running on port ${PORT}`)
});
