import express from "express";
import twilio from "twilio";
import passport from "passport";

import { User } from "../dbs/mongo-db.js";

const router = express.Router();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

router.post("/sign-up", async (req, res, next) => {
  const { username, password, phone, action, useTwilio } = req.body;

  // a method provided by the package, abstracts away our interaction with DB
  if (action === "signup") {
    let verification;
    if (useTwilio) {
      try {
        verification = await client.verify.v2
          .services(process.env.TWILIO_SERVICE_SID)
          .verifications.create({ to: phone, channel: "sms" });
      } catch (error) {
        console.log(error);
        return res.status(400).send(error.toString());
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
      res.send("approved");
    });
  }
});

router.post("/verification", async (req, res) => {
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
});

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send(false);
  });
});

router.get("/auth-status", async (req, res) => {
  res.send({ isAuthenticated: req.isAuthenticated(), user: req.user });
});

router.get("/balance", async (req, res) => {
  res.send({ balance: req.user?.balance });
});

export { router as verificationRoutes };
