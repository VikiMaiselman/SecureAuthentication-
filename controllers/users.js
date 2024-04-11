import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

import { User } from "../dbs/mongo-db.js";
import { authAndStoreSession, authenticateUser, registerUser } from "../models/User.js";

export const signUp = async (req, res) => {
  const { username, password, phone, action, useTwilio } = req.body;

  if (action === "signup") return await register(req, res, username, password, phone, useTwilio);
  if (action === "login") return await login(req, res, username, password, useTwilio);
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
      throw new Error("Invalid OTP!");
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send(error.toString());
  }
  authAndStoreSession(req, res, verificationCheck);
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

/* Internal logic functions */
async function register(req, res, username, password, phone, useTwilio) {
  let verification;

  try {
    const result = await authenticateUser(username, password);
    if (!result.error) throw "The user already exists. You can't register twice.";
  } catch (error) {
    console.error(error);
    if (!error.startsWith("The user already exists")) return res.status(400).json(error);
    // else we can proceed to register the user
  }

  if (useTwilio) {
    try {
      verification = await verifyWithTwilioOTPs(phone);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
  return registerUser(req, res, username, phone, password, verification, useTwilio);
}

async function login(req, res, username, password, useTwilio) {
  let verification, userPhoneStoredInDB;

  try {
    const result = await authenticateUser(username, password);
    userPhoneStoredInDB = result.user.phone;
    if (result.error) throw result.error; // no user found
  } catch (error) {
    return res.status(400).json(error);
  }

  if (useTwilio) {
    try {
      verification = await verifyWithTwilioOTPs(userPhoneStoredInDB);
    } catch (error) {
      console.log(error);
    }
    return res.json(verification.status);
  }
  authAndStoreSession(req, res, { status: "approved" });
}

async function verifyWithTwilioOTPs(phone) {
  try {
    const verification = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_SID)
      .verifications.create({ to: phone, channel: "sms" });
    return verification;
  } catch (error) {
    console.log(error);
    let errMessage = error.toString();
    if (error.toString().includes("phone number is unverified")) {
      errMessage =
        "Your number isn't verified with my Twilio account. Either try to use my phone number (but it is me who will get the verification code) or authenticate w/o Twilio (the button is now available). For more options check my README.md";
    }
    throw errMessage;
  }
}
