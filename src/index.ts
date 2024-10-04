import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import authRouter from "./routes/auth_router";
import userRouter from "./routes/user_router";
import postRouter from "./routes/post_router";

dotenv.config();

const port = process.env.PORT || 8080;

function start() {
  const app = express();
  try {
    app.use(bodyParser.json());

    app.use("/v0/api/", authRouter);
    app.use("/v0/api/", userRouter);
    app.use("/v0/api/", postRouter);

    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch (error: any) {
    console.log(`error in running server : ${error.toString()}`);
  }
}
start();
