import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { User } from "./models";

export async function isLoggedIn(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.token as string;
  try {
    const decodedData = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload;
    const foundUser = await User.findById(decodedData.id);
    //@ts-ignore
    req.foundUser = foundUser;
    next();
  } catch (e) {
    res.status(403).json({
      msg: "You must be signed in to access this page",
      err: e,
    });
  }
}
