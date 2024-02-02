import supertest from "supertest";
import { app } from "../../app";

it("has a route handler listening to /api/tickets for get requests", async () => {
  const res = await supertest(app).get("/api/tickets");
  expect(res.statusCode).not.toEqual(404);
});

it("allows unauthenticated user to list tickets", async () => {
  const res = await supertest(app).get("/api/tickets");
  expect(res.statusCode).not.toEqual(401);
});

it("returns all tickets that are saved in the db", async () => {
  const ticket1 = await createTicket("ticket1", 1);
  const ticket2 = await createTicket("ticket2", 2);

  const res = await supertest(app).get("/api/tickets").expect(200);

  expect(res.body.length).toEqual(2);
  expect(res.body[0].title).toEqual(ticket1.body.title);
  expect(res.body[1].title).toEqual(ticket2.body.title);
});

const createTicket = (title: string, price: number) =>
  supertest(app)
    .post("/api/tickets")
    .set("Cookie", getAuthCookie())
    .send({ title, price })
    .expect(201);
