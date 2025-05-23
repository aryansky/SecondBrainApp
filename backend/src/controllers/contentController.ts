import { Request, Response, NextFunction } from "express";
import { Content } from "../models";
import { contentDeletionSchema, contentZodSchema } from "../zodSchemas";
import errorMap from "zod/lib/locales/en";

// Send all created content, TODO - add exception handling
export async function allContent(req: Request, res: Response) {
  try {
    //@ts-ignore
    const foundUser = req.foundUser;
    const contents = await Content.find({ userId: foundUser._id });
    res.json({
      message: "Here are your contents",
      content: contents,
    });
  } catch (e) {
    res.json({
      msg: "Error in finding your contents",
      err: e,
    });
  }
}

export async function addContent(req: Request, res: Response) {
  const parsedBody = contentZodSchema.safeParse(req.body);

  if (!parsedBody.success) {
    res.json({
      msg: "Invalid json format",
      err: parsedBody.error,
    });
    return;
  }

  try {
    const { link, type, title, tags } = parsedBody.data;
    const response = await Content.insertOne({
      link,
      type,
      title,
      tags,
      //@ts-ignore
      userId: req.foundUser._id,
    });
    res.json({
      content: response,
      msg: "Content inserted successfully",
    });
  } catch (e) {
    res.status(500).json({
      msg: "Database error",
      err: e,
    });
  }
}

export async function deleteContent(req: Request, res: Response) {
  const parsedBody = contentDeletionSchema.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(411).json({
      msg: "Error, invalid inputs recieved",
      err: parsedBody.error,
    });
    return;
  }

  try {
    const { contentId } = parsedBody.data;
    const responseData = await Content.findByIdAndDelete(contentId);
    if (!responseData) {
      throw new Error("There is no such content that exists with that id");
    }
    res.json({
      msg: "Content deleted successfully.",
    });
  } catch (e) {
    res.json({
      msg: "Error while deleting, There is no such content that exists with that id",
      err: e,
    });
  }
}
