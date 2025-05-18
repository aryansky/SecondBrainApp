import { Router } from "express";

const shareRouter = Router();

shareRouter.get("/brain/share", (req, res) => {
  res.json({
    msg: "Not yet implemented",
  });
});

shareRouter.get("/brain/:shareId", (req, res) => {
  res.json({
    msg: "Not yet implemented",
  });
});

export default shareRouter;
