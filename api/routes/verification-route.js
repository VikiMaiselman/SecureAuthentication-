import express from "express";
import twilio from "twilio";
import passport from "passport";

import { User } from "../dbs/mongo-db.js";

const router = express.Router();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

router.post("/sign-up", async (req, res, next) => {
  const { username, password, phone, action } = req.body;

  // const createService = async (req, res) => {
  //   client.verify.v2.services.create({ friendlyName: "phoneVerification" }).then((service) => console.log(service.sid));
  // };

  // a method provided by the package, abstracts away our interaction with DB
  if (action === "signup") {
    let verification;
    User.register({ username: username, phone: phone }, password, async function (err, user) {
      if (err) {
        console.error(err);
        res.status(401).send(err);
        return;
      }

      console.log(phone);
      try {
        verification = await client.verify.v2
          .services(process.env.TWILIO_SERVICE_SID)
          .verifications.create({ to: phone, channel: "sms" });
        console.log(verification.status);
        return res.json(verification.status);
      } catch (error) {
        console.log(error);
        return res.status(error.status).send(error);
      }
    });
  }

  if (action === "login") {
    let verification;
    let userPhoneStoredInDB;
    // console.log(username, password, phone, action, req.user);
    try {
      const result = await User.authenticate()(username, password);
      userPhoneStoredInDB = result.user.phone;
      if (result.error) throw new Error("IncorrectPasswordError: Password or username is incorrect");
    } catch (error) {
      console.log(error);
      res.status(401).send(false);
      return;
    }

    try {
      verification = await client.verify.v2
        .services(process.env.TWILIO_SERVICE_SID)
        .verifications.create({ to: userPhoneStoredInDB, channel: "sms" });
      console.log(verification);
    } catch (error) {
      res.status(401).send(false);
    }
    // console.log(verification);
    // const verification = { status: "pending" };
    return res.json(verification.status);
  }
});

router.post("/verification", async (req, res) => {
  let verificationCheck;
  const { username, password, phone, action, otp } = req.body;
  console.log("in verification", username, password, phone, action, otp);

  try {
    verificationCheck = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks.create({ to: phone, code: otp });
    console.log(verificationCheck.status);
    if (verificationCheck.status !== "approved") {
      throw new "Invalid OTP!"();
    }
  } catch (error) {
    return res.status(401).send(false);
  }

  passport.authenticate("local")(req, res, function () {
    console.log("verify", req.isAuthenticated());
    res.send(verificationCheck.status);
  });

  //   req.login(user, function (err) {
  //     if (err) {
  //       console.error(err);
  //       res.status(401).send(err);
  //       return;
  //     }

  //     passport.authenticate("local")(req, res, function () {
  //       res.send(true);
  //     });
  //   });
});

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send(false);
  });
});

const getStatus = async (req, res) => {
  res.send(req.isAuthenticated());
};

// export const getCurrentUser = async (req, res) => {
//   res.send({ id: req.user?._id, username: req.user?.username });
// };

export { router as verificationRoutes };
