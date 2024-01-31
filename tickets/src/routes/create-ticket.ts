import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@ccrane-git-tix/common";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";

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
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const currentUser = req.currentUser!; // requireAuth MW guarantees it

    const ticket = Ticket.build({ title, price, userId: currentUser.id });
    await ticket.save();

    res.status(201).send(JSON.stringify(ticket));
  },
);

export { router as createTicketRouter };
