import express from "express";
const router = express.Router();

import { register, login, logout, getStatus, getCurrentUser } from "./userController.js";

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/authstatus", getStatus);
router.get("/get-user", getCurrentUser);

export { router as userAuthRoutes };
