import express from "express";
const router = express.Router();

import { getTransactions, createTransaction } from "../controllers/transactions.js";

router.get("/transactions", getTransactions);
router.post("/transactions", createTransaction);

export { router as transactionRoutes };
