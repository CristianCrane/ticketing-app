import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
require("express-async-errors"); // no declaration file

import { currentUserRouter } from "./routes/current-user";
import { signUpRouter } from "./routes/sign-up";
import { signInRouter } from "./routes/sign-in";
import { signOutRouter } from "./routes/sign-out";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";

const app = express();
app.set("trust proxy", true); // make sure express understands its behind nginx, its ok to trust
app.use(json());
app.use(
  cookieSession({
    // disable encryption, jwt is already encrypted
    signed: false,
    // only send cookies back when on https (except when running tests)
    secure: process.env.NODE_ENV !== "test",
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

export { app };
