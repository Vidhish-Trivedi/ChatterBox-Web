import express from "express";
import authenticateRoute from "../middleware/authenticateRoute.js";
import getSidebarUsers from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", authenticateRoute, getSidebarUsers);

export default router;
