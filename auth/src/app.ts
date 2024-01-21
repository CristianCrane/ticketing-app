import express from "express";
import {json} from "body-parser";
import cookieSession from "cookie-session";
import {currentUserRouter} from "./routes/current-user";
import {signUpRouter} from "./routes/sign-up";
import {signInRouter} from "./routes/sign-in";
import {signOutRouter} from "./routes/sign-out";
import {NotFoundError} from "./errors/not-found-error";
import {errorHandler} from "./middlewares/error-handler";
require("express-async-errors"); // no declaration file

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

export { app }