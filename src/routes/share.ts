import { Router } from "express";
import { shareHandler, shareIdContents } from "../controllers/shareController";
import { isLoggedIn } from "../middlewares";

const shareRouter = Router();

shareRouter.get("/brain/share", isLoggedIn, shareHandler);

shareRouter.get("/brain/:shareId", shareIdContents);

export default shareRouter;
