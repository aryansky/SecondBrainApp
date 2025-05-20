import { Router } from "express";
import {
  addContent,
  allContent,
  deleteContent,
} from "../controllers/contentController";
import { isLoggedIn } from "../middlewares";

const contentRouter = Router();

contentRouter
  .route("/content")
  .get(isLoggedIn, allContent)
  .post(isLoggedIn, addContent)
  .delete(isLoggedIn, deleteContent);

export default contentRouter;
