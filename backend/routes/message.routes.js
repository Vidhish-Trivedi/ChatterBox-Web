import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import authenticateRoute from "../middleware/authenticateRoute.js";

const router = express.Router();

router.get("/:id", authenticateRoute, getMessages);
router.post("/send/:id", authenticateRoute, sendMessage);

export default router;
