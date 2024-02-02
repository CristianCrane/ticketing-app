import { Router, Request, Response } from "express";
import { Ticket } from "../models/ticket";
import { NotFoundError } from "@ccrane-git-tix/common";

const route = Router();

route.get("/api/tickets/:id", async (req: Request, res: Response) => {
  const ticketId = req.params.id;

  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    throw new NotFoundError();
  }

  res.send(ticket);
});

export { route as getTicketRoute };
