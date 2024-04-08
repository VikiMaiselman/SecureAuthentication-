import { Transaction, User } from "../dbs/mongo-db.js";

export const getTransactionsFromMongoDB = async (relevantUser) => {
  try {
    const txs = await Transaction.find({ $or: [{ to: relevantUser }, { from: relevantUser }] })
      .populate("to")
      .populate("from");
    return txs;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const findUserbyUsername = async (relevantUser) => {
  try {
    const user = await User.findOne({ username: relevantUser });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createNewTransaction = async (name, amount, userTo, userFrom) => {
  try {
    const newTx = new Transaction({
      name: name,
      amount: amount,
      to: userTo._id,
      from: userFrom._id,
      when: new Date(),
    });
    await newTx.save();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUserBalance = async (relevantUser, newBalance) => {
  try {
    await User.findOneAndUpdate({ username: relevantUser }, { balance: newBalance });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
