import express from "express";
import { register } from "../controller/auth/register";
import { login } from "../controller/auth/login";

const authRouter = express.Router();

authRouter.post("/auth/register", register);
authRouter.post("/auth/login", login);

export default authRouter;
