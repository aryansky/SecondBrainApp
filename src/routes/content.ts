import { Router } from "express";

const contentRouter = Router();

contentRouter
  .route("/content")
  .get((req, res) => {
    res.json({
      message: "Here are your contents",
      content: "content",
    });
  })
  .post((req, res) => {
    res.send("post router Not yet functional");
  })
  .delete((req, res) => {
    res.send("Delete route Not yet functional");
  });

export default contentRouter;
