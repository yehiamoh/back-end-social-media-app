import express from "express";
import { register } from "../controller/auth/register";
import { login } from "../controller/auth/login";
import { resetPassword } from "../controller/auth/reset_password";

import { ensureAuthentication } from "../middleware/authMiddleware";

const authRouter = express.Router();

authRouter.post("/auth/register", register);
authRouter.post("/auth/login", login);
authRouter.post("/auth/reset-password",ensureAuthentication,resetPassword );

export default authRouter;
