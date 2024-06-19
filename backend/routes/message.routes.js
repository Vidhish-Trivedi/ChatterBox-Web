import express from "express";
import { sendMessage } from "../controllers/message.controller.js";
import authenticateRoute from "../middleware/authenticateRoute.js";

const router = express.Router();

router.post("/send/:id", authenticateRoute, sendMessage);

export default router;
