import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  currentUser,
  errorHandler,
  NotFoundError,
} from "@ccrane-git-tix/common";
import { createTicketRouter } from "./routes/create-ticket";

require("express-async-errors"); // no declaration file

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
app.use(currentUser);

// add routes here
app.use(createTicketRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
