import supertest from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns 404 when ticket is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await supertest(app).get(`/api/tickets/${id}`).send().expect(404);
});

it("returns the ticket if the ticket is found", async () => {
  const title = "test";
  const price = 123;

  const createResponse = await supertest(app)
    .post(`/api/tickets`)
    .set("Cookie", getAuthCookie())
    .send({ title, price })
    .expect(201);

  const ticketId = createResponse.body.id;

  const getResponse = await supertest(app)
    .get(`/api/tickets/${ticketId}`)
    .send()
    .expect(200);

  expect(getResponse.body.title).toEqual(title);
});
