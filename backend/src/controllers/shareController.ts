import { Request, Response, NextFunction } from "express";
import { Content, Link } from "../models";
import { v4 as uuidv4 } from "uuid";

function generateUID() {
  let firstPart: string = String((Math.random() * 46656) | 0);
  let secondPart: string = String((Math.random() * 46656) | 0);
  firstPart = ("000" + firstPart).slice(-3);
  secondPart = ("000" + secondPart).slice(-3);
  return firstPart + secondPart;
}

export async function shareHandler(req: Request, res: Response) {
  try {
    //@ts-ignore
    const foundUser = req.foundUser;
    const foundLink = await Link.findOne({
      userId: foundUser._id,
    });

    if (foundLink) {
      res.json({
        shareId: foundLink.shareId,
      });
      return;
    }

    const shareId = uuidv4();

    const generatedLink = await Link.insertOne({
      shareId: shareId,
      userId: foundUser._id,
    });

    res.json({
      shareId: generatedLink.shareId,
    });
  } catch (e) {
    res.status(403).json({ msg: "Something went wrong", err: e });
  }
}

export async function shareIdContents(req: Request, res: Response) {
  const { shareId } = req.params;
  const foundLink = await Link.findOne({ shareId });
  if (!foundLink) {
    res.status(404).json({
      msg: "Nothing found on that Id",
    });
  }

  const foundContent = await Content.find({
    userId: foundLink?.userId,
  }).populate("userId");

  res.json({
    content: foundContent,
  });
}
