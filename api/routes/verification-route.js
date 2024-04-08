import express from "express";

import { signUp, verify, logOut, checkAuthenticated, getBalance } from "../controllers/users.js";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/verification", verify);
router.get("/logout", logOut);

router.get("/auth-status", checkAuthenticated);
router.get("/balance", getBalance);

export { router as verificationRoutes };
