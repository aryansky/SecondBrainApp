import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { User } from "../models";
import * as jwt from "jsonwebtoken";
import { userZodSchema } from "../zodSchemas";
import errorMap from "zod/lib/locales/en";

// Sign Up Handler, TODO - add zod validation and error catching
export async function userSignUp(req: Request, res: Response) {
  const parsedBody = userZodSchema.safeParse(req.body);

  if (parsedBody.success) {
    const { username, password } = parsedBody.data;
    let hashedPass = await bcrypt.hash(password, 12);
    try {
      await User.insertOne({
        username: username,
        password: hashedPass,
      });
      res.json({ msg: "Sign up successfull" });
    } catch (e) {
      res.status(403).json({
        msg: "Username already taken!",
      });
    }
  } else {
    res.status(411).json({
      msg: "Invalid inputs recieved",
      err: parsedBody.error.issues[0].message,
    });
  }
}

// Sign In Handler, TODO - add zod validation and error catching
export async function userSignIn(req: Request, res: Response) {
  const parsedBody = userZodSchema.safeParse(req.body);

  if (parsedBody.success) {
    const { username, password } = parsedBody.data;

    try {
      const foundUser = await User.findOne({ username });
      const result = await bcrypt.compare(password, foundUser?.password!);
      if (result) {
        res.json({
          token: jwt.sign({ id: foundUser?._id }, process.env.JWT_SECRET!),
        });
      } else {
        res.status(403).json({ msg: "Username or password was wrong" });
      }
    } catch (e) {
      res.status(403).json({
        msg: "Username or password was wrong",
      });
    }
  } else {
    res.status(411).json({
      msg: "Invalid inputs recieved",
      err: parsedBody.error.issues[0].message,
    });
  }
}
