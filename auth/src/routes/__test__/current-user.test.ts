import request from "supertest";
import { app } from "../../app";

it("responds with details about the current user", async () => {
  const cookie = await getAuthCookie();

  const res = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .expect(200);

  expect(res.body.currentUser.email).toEqual("test@test.com");
});

it("responds with null current user if not authenticated", async () => {
  const res = await request(app).get("/api/users/currentuser").expect(200);

  expect(res.body.currentUser).toBe(null);
});
