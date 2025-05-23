import express from "express";
import userRouter from "./routes/user";
import contentRouter from "./routes/content";
import shareRouter from "./routes/share";
import * as dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/", userRouter);
app.use("/api/v1/", contentRouter);
app.use("/api/v1/", shareRouter);

app.listen(process.env.PORT, () => {
  console.log("Started listening on PORT " + process.env.PORT);
});
