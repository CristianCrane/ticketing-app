import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@ccrane-git-tix/common";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    const { title, price } = req.body;
    res.send(201);
  },
);

export { router as createTicketRouter };
