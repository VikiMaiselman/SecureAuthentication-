import {
  createNewTransaction,
  findUserbyUsername,
  getTransactionsFromMongoDB,
  updateUserBalance,
} from "../models/Transaction.js";

export const getTransactions = async (req, res) => {
  try {
    const txs = await getTransactionsFromMongoDB(req.user);
    return res.json(txs);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

export const createTransaction = async (req, res) => {
  const { name, amount, to } = req.body;
  try {
    const userTo = await findUserbyUsername(to);
    const userFrom = req.user;

    if (userTo === null) throw new Error("Check the reciepient data to be correct.");
    if (userFrom === null) throw new Error("Please, sign up. You have been logged out.");

    await createNewTransaction(name, amount, userTo, userFrom);
    await updateBalances(userTo, userFrom, amount);
    return res.send("Transaction successfully created!");
  } catch (error) {
    console.error(error);
    return res.status(400).send("Transaction was not successful. " + error);
  }
};

async function updateBalances(userTo, userFrom, amount) {
  try {
    const updateTo = userTo.balance + amount;
    const updateFrom = userFrom.balance - amount;
    await updateUserBalance(userTo.username, updateTo);
    await updateUserBalance(userFrom.username, updateFrom);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
