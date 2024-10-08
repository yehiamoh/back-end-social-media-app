import  express  from "express";
import { ensureAuthentication } from "../middleware/authMiddleware";
import { getProfile } from "../controller/user/profile";
import { follow } from "../controller/user/follow";
import { unfollow } from "../controller/user/unfollow";
import { feed } from "../controller/user/feed";

const userRouter= express.Router();

userRouter.get('/user/profile',ensureAuthentication,getProfile);
userRouter.post('/user/:followedUserId/follow',ensureAuthentication,follow);
userRouter.post('/user/:followedUserId/unfollow',ensureAuthentication,unfollow);
userRouter.post('/user/feed',ensureAuthentication,feed);

export default userRouter;