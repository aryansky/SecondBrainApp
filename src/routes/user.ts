import { Router } from "express";
import { userSignIn, userSignUp } from "../controllers/usersController";

const userRouter = Router();

// Routes
userRouter.route("/signup").post(userSignUp);
userRouter.route("/signin").post(userSignIn);

export default userRouter;
