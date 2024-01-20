import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";

/**
 * Note: this middleware is intended to be used in combination with {@link currentUser } middleware.
 * The {@link currentUser } middleware must be called first to extract the current user from the jwt.
 * Then this middleware can be applied to *require* it.
 *
 * @param req
 * @param res
 * @param next
 * @constructor
 */
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  return next();
};
