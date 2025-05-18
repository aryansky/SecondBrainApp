import express from "express";
import userRouter from "./routes/user";
import contentRouter from "./routes/content";
import shareRouter from "./routes/share";
const PORT = 3000;

const app = express();

app.use("/api/v1/", userRouter);
app.use("/api/v1/", contentRouter);
app.use("/api/v1/", shareRouter);

app.listen(PORT, () => {
  console.log("Started listening on PORT " + PORT);
});
