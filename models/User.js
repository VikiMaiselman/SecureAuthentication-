import passport from "passport";
import { User } from "../dbs/mongo-db.js";

export const registerUser = (req, res, username, phone, password, verification, useTwilio) => {
  User.register({ username: username, phone: phone, balance: 100 }, password, async function (err, user) {
    if (err) {
      console.error(err);
      return res.status(401).send(err);
    }

    if (useTwilio) return res.send(verification.status);

    passport.authenticate("local")(req, res, function () {
      console.log("sending approved");
      return res.send("approved");
    });
  });
};

export const authenticateUser = async (username, password) => {
  try {
    return await User.authenticate()(username, password);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const authAndStoreSession = (req, res, verificationCheck) => {
  passport.authenticate("local")(req, res, function () {
    res.send(verificationCheck.status);
  });
};
