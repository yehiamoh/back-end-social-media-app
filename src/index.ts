import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import authRouter from "./routes/auth_router";
import userRouter from "./routes/user_router";

dotenv.config();

const port = process.env.PORT || 8080;

function start() {
  const app = express();
  try {
    app.use(bodyParser.json());

    app.use("/api/v0/", authRouter);
    app.use("/api/v0/", userRouter);

    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch (error: any) {
    console.log(`error in running server : ${error.toString()}`);
  }
}
start();
