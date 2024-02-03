import supertest from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 404 if the ticketId doesnt exist", async () => {
  const ticketId = newMongooseId();
  await supertest(app)
    .put(`/api/tickets/${ticketId}`)
    .set("Cookie", getAuthCookie())
    .send({
      title: "test",
      price: 20,
    })
    .expect(404);
});

it("returns a 401 if user is not authenticated", async () => {
  const ticketId = newMongooseId();
  await supertest(app)
    .put(`/api/tickets/${ticketId}`)
    .send({
      title: "test",
      price: 20,
    })
    .expect(401);
});

it("returns a 401 if the user doesnt own the ticket", async () => {
  const ownerId = "user1";
  const otherId = "user2";

  const createTicketRes = await supertest(app)
    .post("/api/tickets")
    .set("Cookie", getAuthCookie({ userId: ownerId }))
    .send({ title: "test", price: 20 })
    .expect(201);

  const ticketId = createTicketRes.body.id;

  await supertest(app)
    .put(`/api/tickets/${ticketId}`)
    .set("Cookie", getAuthCookie({ userId: otherId }))
    .send({ title: "123", price: 123 })
    .expect(401);
});

it("returns a 400 if the user provides an invalid title or price", async () => {
  const createTicketRes = await supertest(app)
    .post("/api/tickets")
    .set("Cookie", getAuthCookie())
    .send({ title: "test", price: 20 })
    .expect(201);

  const ticketId = createTicketRes.body.id;

  await supertest(app)
    .put(`/api/tickets/${ticketId}`)
    .set("Cookie", getAuthCookie())
    .send({})
    .expect(400);

  await supertest(app)
    .put(`/api/tickets/${ticketId}`)
    .set("Cookie", getAuthCookie())
    .send({
      title: "",
      price: 20,
    })
    .expect(400);

  await supertest(app)
    .put(`/api/tickets/${ticketId}`)
    .set("Cookie", getAuthCookie())
    .send({
      title: "test",
      price: -1,
    })
    .expect(400);
});

it("updates the ticket with valid user and input", async () => {
  const createTicketRes = await supertest(app)
    .post("/api/tickets")
    .set("Cookie", getAuthCookie())
    .send({ title: "test", price: 20 })
    .expect(201);

  const ticketId = createTicketRes.body.id;
  const newTitle = "updated title";
  const newPrice = 999;

  await supertest(app)
    .put(`/api/tickets/${ticketId}`)
    .set("Cookie", getAuthCookie())
    .send({ title: newTitle, price: newPrice })
    .expect(200);

  const res = await supertest(app).get(`/api/tickets/${ticketId}`).expect(200);

  expect(res.body.title).toEqual(newTitle);
  expect(res.body.price).toEqual(newPrice);
});

const newMongooseId = () => new mongoose.Types.ObjectId().toHexString();
