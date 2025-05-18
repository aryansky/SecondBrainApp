import { Router } from "express";

const userRouter = Router();

userRouter.route("/signup").post((req, res) => {
  res.send("Hi there");
});

userRouter.route("/signin").post((req, res) => {
  res.send("Hi there");
});

export default userRouter;
