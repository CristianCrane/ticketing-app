import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  const userJwt = req?.session?.jwt;

  if (!userJwt) {
    return res.send({ currentUser: null });
  }

  try {
    const payload = jwt.verify(userJwt, process.env.JWT_KEY!);
    res.send({ currentUser: payload });
  } catch (e) {
    // jwt was invalid/tampered with
    return res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };
