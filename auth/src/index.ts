import cookieSession from "cookie-session";
import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
require("express-async-errors"); // no declaration file

import { currentUserRouter } from "./routes/current-user";
import { signUpRouter } from "./routes/sign-up";
import { signInRouter } from "./routes/sign-in";
import { signOutRouter } from "./routes/sign-out";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.set("trust proxy", true); // make sure express understands its behind nginx, its ok to trust
app.use(json());
app.use(
  cookieSession({
    signed: false, // disable encryption, jwt is already encrypted
    secure: true, // only require when on https
  }),
);

// routes
app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to mongoDB");
  } catch (e) {
    console.error("Failed to connect to mongo DB:", e);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

start();
