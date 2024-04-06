import express from "express";
import twilio from "twilio";
import passport from "passport";

import { User } from "../dbs/mongo-db.js";

const router = express.Router();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// router.post("/sign-up", async (req, res) => {
//   console.log("Hellow", req.body);

//   try {
//     // client.verify.v2.services.create({ friendlyName: "vikiSMSVerification" });
//     // const verification = await client.verify.v2
//     //   .services(process.env.TWILIO_SERVICE_SID)
//     //   .verifications.create({ to: req.body.phone, channel: "sms" });
//     // console.log(verification);
//   } catch (error) {}

//   const verification = { status: "pending" };
//   return res.json(verification.status);
// });

// router.post("/verification", async (req, res) => {
//   console.log(req.body);
//   try {
//     // const verificationCheck = await client.verify.v2
//     //   .services(process.env.TWILIO_SERVICE_SID)
//     //   .verificationChecks.create({ to: req.body.phone, code: req.body.otp });
//     // console.log(verificationCheck.status);
//     // if (verificationCheck.status !== "approved") {
//     //   throw new "Invalid OTP!"();
//     // }
//   } catch (error) {
//     return res.json(false);
//   }

//   const { action } = req.body;
//   action === "signup" ? register(req, res) : login(req, res);

//   //   return res.json("approved");
//   return res.json(true);
// });

router.post("/sign-up", async (req, res, next) => {
  const { username, password, phone, action } = req.body;

  // a method provided by the package, abstracts away our interaction with DB
  if (action === "signup") {
    User.register({ username: username, phone: phone }, password, async function (err, user) {
      if (err) {
        console.error(err);
        res.status(401).send(err);
        return;
      }

      console.log("hello user", user);
      try {
        // const verification = await client.verify.v2
        //   .services(process.env.TWILIO_SERVICE_SID)
        //   .verifications.create({ to: req.body.phone, channel: "sms" });
        // console.log(verification);
      } catch (error) {
        return res.json(false);
      }
      const verification = { status: "pending" };
      return res.json(verification.status);
      // if the user was successfully authenticated
      // passport.authenticate("local")(req, res, async function () {
      //   return;
      // });
    });
  }

  if (action === "login") {
    const user = new User({
      username: username,
      password: password,
    });

    console.log("User.login", User.login);

    try {
      const result = await User.authenticate()(username, password);
      if (result.error) throw new Error("IncorrectPasswordError: Password or username is incorrect");
    } catch (error) {
      console.log(error);
      res.status(401).send(false);
      return;
    }

    try {
      // const verification = await client.verify.v2
      //   .services(process.env.TWILIO_SERVICE_SID)
      //   .verifications.create({ to: req.body.phone, channel: "sms" });
      // console.log(verification);
    } catch (error) {
      return res.json(false);
    }
    const verification = { status: "pending" };
    return res.json(verification.status);
  }
});

router.post("/verification", async (req, res) => {
  const { username, password, phone, action, otp } = req.body;
  console.log("in verification", username, password, phone, action, otp);

  try {
    // const verificationCheck = await client.verify.v2
    //   .services(process.env.TWILIO_SERVICE_SID)
    //   .verificationChecks.create({ to: phone, code: otp });
    // console.log(verificationCheck.status);
    // if (verificationCheck.status !== "approved") {
    //   throw new "Invalid OTP!"();
    // }
  } catch (error) {
    return res.json(false);
  }

  passport.authenticate("local")(req, res, function () {
    console.log("verify", req.isAuthenticated());
    res.send("approved");
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

// router.post("/register", register);
// router.post("/login", login);
// router.get("/logout", logout);
// router.get("/authstatus", getStatus);
// router.get("/get-user", getCurrentUser);

export { router as verificationRoutes };
