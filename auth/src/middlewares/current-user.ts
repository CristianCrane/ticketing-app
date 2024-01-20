import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

// adding currentUser to the express request object globally
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.session?.jwt) {
    // if there's no jwt(user) just continue
    return next();
  }

  try {
    // decode the users jwt
    // set it on req.currentUser for subsequent middlewares/routes to access
    req.currentUser = verify(
      req.session.jwt,
      process.env.JWT_KEY!,
    ) as UserPayload;
  } catch (e) {}

  next();
};
