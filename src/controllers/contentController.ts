import { Request, Response, NextFunction } from "express";
import { User } from "../models";

// Sign Up Handler, TODO - add zod validation and error catching
export async function allContent(req: Request, res: Response) {
  const { link, type, title, tags, userId } = req.body;

  res.json({
    message: "Here are your contents",
    content: "content",
  });
}

export async function addContent(req: Request, res: Response) {
  res.send("post router Not yet functional");
}

export async function deleteContent(req: Request, res: Response) {
  res.send("Delete route Not yet functional");
}
