import twilio from "twilio";
import passport from "passport";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

import { User } from "../dbs/mongo-db.js";

export const signUp = async (req, res) => {
  const { username, password, phone, action, useTwilio } = req.body;

  if (action === "signup") {
    let verification;
    if (useTwilio) {
      try {
        verification = await client.verify.v2
          .services(process.env.TWILIO_SERVICE_SID)
          .verifications.create({ to: phone, channel: "sms" });
      } catch (error) {
        console.log(error);
        let errMessage = error.toString();
        if (error.toString().includes("phone number is unverified")) {
          errMessage =
            "Your number is not verified with my Twilio account. Either try to use my phone number (but I will get the verification code) or authenticate w/o Twilio (the button is now available). For more options see README.md";
        }
        return res.status(400).send(errMessage);
      }
    }

    User.register({ username: username, phone: phone, balance: 100 }, password, async function (err, user) {
      if (err) {
        console.error(err);
        return res.status(401).send(err);
      }
      if (useTwilio) return res.json(verification.status);

      passport.authenticate("local")(req, res, function () {
        // res.send(verificationCheck.status);
        console.log("sending approved");
        return res.send("approved");
      });
    });
  }

  if (action === "login") {
    let verification, userPhoneStoredInDB;

    try {
      const result = await User.authenticate()(username, password);
      userPhoneStoredInDB = result.user.phone;
      if (result.error) throw new Error(result.error);
    } catch (error) {
      return res.status(400).json(error.toString());
    }

    if (useTwilio) {
      try {
        verification = await client.verify.v2
          .services(process.env.TWILIO_SERVICE_SID)
          .verifications.create({ to: userPhoneStoredInDB, channel: "sms" });
      } catch (error) {
        console.log(error);
        return res.status(401).send(`TWILIO:${error.toString()}`);
      }
      return res.json(verification.status);
    }

    passport.authenticate("local")(req, res, function () {
      console.log("sending approved");
      res.send("approved");
    });
  }
};

export const verify = async (req, res) => {
  let verificationCheck, userPhoneStoredInDB;
  const { username, password, otp } = req.body;

  try {
    const result = await User.authenticate()(username, password);
    userPhoneStoredInDB = result.user.phone;

    verificationCheck = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks.create({ to: userPhoneStoredInDB, code: otp });
    if (verificationCheck.status !== "approved") {
      throw new "Invalid OTP!"();
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send(error.toString());
  }

  passport.authenticate("local")(req, res, function () {
    res.send(verificationCheck.status);
  });
};

export const logOut = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send(false);
  });
};

export const checkAuthenticated = async (req, res) => {
  res.send({ isAuthenticated: req.isAuthenticated(), user: req.user });
};

export const getBalance = async (req, res) => {
  res.send({ balance: req.user?.balance });
};
