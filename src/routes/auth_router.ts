import  express  from "express";
import  {register}  from "../controller/auth/register";

const authRouter= express.Router();

authRouter.post('/auth/register',register)

export default authRouter;