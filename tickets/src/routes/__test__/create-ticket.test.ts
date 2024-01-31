import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it("has a route handler listening to /api/tickets for post requests", async () => {
  const res = await request(app).post("/api/tickets").send({});

  expect(res.statusCode).not.toEqual(404);
});

it("returns 401 if user not signed in", async () => {
  return request(app).post("/api/tickets").send({}).expect(401);
});

it("returns non 401 response when valid user is signed in", async () => {
  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", getAuthCookie())
    .send({});
  expect(res.statusCode).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
  const cookie = getAuthCookie();

  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 0,
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      price: 0,
    })
    .expect(400);
});

it("returns an error if an invalid price is provided", async () => {
  const cookie = getAuthCookie();

  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "test title",
      // no price
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "test title",
      price: -1000,
    })
    .expect(400);
});

it("creates a ticket with valid inputs", async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", getAuthCookie())
    .send({
      title: "test title",
      price: 100,
    })
    .expect(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
});
