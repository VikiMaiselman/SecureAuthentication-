import express from "express";
const router = express.Router();

import { User, Transaction } from "../dbs/mongo-db.js";

router.get("/transactions", async (req, res) => {
  try {
    const txs = await Transaction.find({ $or: [{ to: req.user }, { from: req.user }] });
    return res.json(txs);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
});

router.post("/transactions", async (req, res) => {
  const { name, amount, to } = req.body;
  try {
    const userTo = await User.findOne({ username: to });
    const userFrom = req.user;

    if (userTo === null) throw new Error("Check the reciepient data to be correct.");
    if (userFrom === null) throw new Error("Please, sign up. You have been logged out.");

    const newTx = new Transaction({
      name: name,
      amount: amount,
      to: userTo._id,
      from: userFrom._id,
      when: new Date(),
    });
    await newTx.save();

    const updateTo = userTo.balance + amount;
    const updateFrom = userFrom.balance - amount;
    await User.findOneAndUpdate({ username: to }, { balance: updateTo });
    await User.findOneAndUpdate({ username: userFrom.username }, { balance: updateFrom });

    return res.send("Transaction successfully created!");
  } catch (error) {
    console.error(error);
    return res.status(400).send("Transaction was not successful. " + error);
  }
});

export { router as transactionRoutes };
