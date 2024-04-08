import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import session from "express-session";
import passport from "passport";
// import redis from "connect-redis";
// const RedisStore = redis(session);

import { db, initDb as initializeMongoDatabase } from "./dbs/mongo-db.js";
import { verificationRoutes } from "./routes/verification-route.js";
import { transactionRoutes } from "./routes/transaction-route.js";

const app = express();
const port = process.env.PORT || 3000;

// CORS (development stage only)
app.use(
  cors({
    origin: "http://localhost:5173", // allows the server to accept request from React app
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allows session cookie from browser to pass through
  })
);
app.use("*", function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.options("*", cors());

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Authentication (initialize passport + session)
app.use(
  session({
    secret: process.env.PASSPORT_SECRET,
    resave: false,
    saveUninitialized: false,
    // store: new RedisStore(options),
    cookie: {
      httpOnly: false,
      // secure: true,

      secure: true, // set this to true if you're using https
      sameSite: "lax", // set this to 'none' if your site is served over https
      // other cookie settings
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// DB init
initializeMongoDatabase();

// Routes
app.use(verificationRoutes);
app.use(transactionRoutes);

app // Listening to incoming requests
  .listen(port, "0.0.0.0", () => console.log(`Server's up. Listening on port ${port}`));

// DB connection close
process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("Mongoose connection is disconnected due to application termination");
    process.exit(0);
  } catch (error) {
    console.error(error);
  }
});
