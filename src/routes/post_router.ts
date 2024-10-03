import express from "express";
import { ensureAuthentication } from "../middleware/authMiddleware";
import { getPosts } from "../controller/post/get_all_posts";
import { addPost } from "../controller/post/add_post";
import { getSinglePost } from "../controller/post/get_single_post";

const postRouter=express.Router();

postRouter.get('/posts',getPosts);
postRouter.post('/posts',ensureAuthentication,addPost);
postRouter.get('/posts/:postId',getSinglePost);

export default postRouter