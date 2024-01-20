import { Request, Response, NextFunction } from "express";
import { BaseError } from "../errors/base-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  return res.status(500).send({
    errors: [{ message: err.message ?? "An unexpected error occurred" }],
  });
};
