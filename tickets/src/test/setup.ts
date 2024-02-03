import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

type GetAuthCookieOverrides = {
  userId?: string;
  email?: string;
};

declare global {
  var getAuthCookie: (overrides?: GetAuthCookieOverrides) => string;
}

let mongo: MongoMemoryServer;

// connect to the in mem db before tests
beforeAll(async () => {
  process.env.JWT_KEY = "asdf";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

// before each test, reset all data in db
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany();
  }
});

// clean up after tests are done
afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

// --- Global helper methods ---
global.getAuthCookie = (overrides?: GetAuthCookieOverrides) => {
  const id = overrides?.userId ?? "1234";
  const email = overrides?.email ?? "test@test.com";

  // fake the jwt in tests
  const jwtPayload = { id, email };
  const token = jwt.sign(jwtPayload, process.env.JWT_KEY!);
  const sessionObject = { jwt: token };
  const sessionJson = JSON.stringify(sessionObject);
  const base64EncodedSession = Buffer.from(sessionJson).toString("base64");
  return `session=${base64EncodedSession}`;
};
