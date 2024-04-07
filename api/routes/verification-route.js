import express from "express";
import twilio from "twilio";
import passport from "passport";

import { User } from "../dbs/mongo-db.js";

const router = express.Router();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
// const apiSid = process.env.TWILIO_API_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = twilio(accountSid, authToken, { apiSid });

router.post("/sign-up", async (req, res, next) => {
  const { username, password, phone, action } = req.body;

  // const createService = async (req, res) => {
  //   client.verify.v2.services.create({ friendlyName: "phoneVerification" }).then((service) => console.log(service.sid));
  // };
  // await createService();

  // a method provided by the package, abstracts away our interaction with DB
  if (action === "signup") {
    let verification;
    try {
      // verification = await client.verify.v2
      //   .services(process.env.TWILIO_SERVICE_SID)
      //   .verifications.create({ to: phone, channel: "sms" });
      // console.log(verification.status);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error.toString());
    }

    User.register({ username: username, phone: phone, balance: 100 }, password, async function (err, user) {
      if (err) {
        console.error("err on registration", err);
        return res.status(401).send(err);
      }
      // return res.json(verification.status);
      return res.json("pending");
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

    try {
      // verification = await client.verify.v2
      //   .services(process.env.TWILIO_SERVICE_SID)
      //   .verifications.create({ to: userPhoneStoredInDB, channel: "sms" });
      // console.log(verification);
    } catch (error) {
      console.log(error);
      return res.status(401).send(error.toString());
    }

    verification = { status: "pending" };
    return res.json(verification.status);
  }
});

router.post("/verification", async (req, res) => {
  let verificationCheck, userPhoneStoredInDB;
  const { username, password, phone, action, otp } = req.body;
  console.log("in verification", username, password, phone, action, otp);

  try {
    const result = await User.authenticate()(username, password);
    userPhoneStoredInDB = result.user.phone;

    // verificationCheck = await client.verify.v2
    //   .services(process.env.TWILIO_SERVICE_SID)
    //   .verificationChecks.create({ to: userPhoneStoredInDB, code: otp });
    // console.log(verificationCheck.status);
    // if (verificationCheck.status !== "approved") {
    //   throw new "Invalid OTP!"();
    // }
  } catch (error) {
    console.error(error);
    return res.status(401).send(error.toString());
  }

  passport.authenticate("local")(req, res, function () {
    // res.send(verificationCheck.status);
    res.send("approved");
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
  console.log(req.user);
  res.send({ isAuthenticated: req.isAuthenticated(), user: req.user });
});

// export const getCurrentUser = async (req, res) => {
//   res.send({ id: req.user?._id, username: req.user?.username });
// };

export { router as verificationRoutes };
