import supertest from "supertest";
import { app } from "../../app";
// import { Ticket } from "../../models/ticket";

it("has a route handler listening to /api/tickets for get requests", async () => {
  const res = await supertest(app).get("/api/tickets");
  expect(res.statusCode).not.toEqual(404);
});

// it("allows unauthenticated user to list tickets", async () => {
//   const res = await supertest(app).get("/api/tickets");
//   expect(res.statusCode).not.toEqual(401);
// });
//
// it("returns all tickets that are saved in the db", async () => {
//   const ticket = Ticket.build({ price: 0, title: "test", userId: "test" });
//   await ticket.save();
//
//   const res = await supertest(app).get("/api/tickets");
//   expect(res.body.length).toEqual(1);
// });
