import  express  from "express";
import { ensureAuthentication } from "../middleware/authMiddleware";
import { getCurrentUser } from "../controller/user/get_single_user";

const userRouter= express.Router();

userRouter.get('/user/current-user',ensureAuthentication,getCurrentUser)

export default userRouter;