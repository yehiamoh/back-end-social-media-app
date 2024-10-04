import express from "express";
import { ensureAuthentication } from "../middleware/authMiddleware";
import { getPosts } from "../controller/post/get_all_posts";
import { addPost } from "../controller/post/add_post";
import { getSinglePost } from "../controller/post/get_single_post";
import { deletePost } from "../controller/post/delete_post";
import { updatePost } from "../controller/post/update_post";
import { like } from "../controller/post/like";
import { unLike } from "../controller/post/unlike";
import { addCommnet } from "../controller/post/add_comment";
import { getComments } from "../controller/post/get_all_comments";

const postRouter=express.Router();

postRouter.get('/posts',getPosts);
postRouter.post('/posts',ensureAuthentication,addPost);
postRouter.get('/posts/:postId',getSinglePost);
postRouter.get('/posts/:postId',ensureAuthentication,deletePost);
postRouter.put('/posts/:postId',ensureAuthentication,updatePost);
postRouter.post('/posts/:postId/like',ensureAuthentication,like);
postRouter.delete('/posts/:postId',ensureAuthentication,unLike);
postRouter.post('/posts/:postId/comment',ensureAuthentication,addCommnet);
postRouter.get('/posts/:postId/comment',ensureAuthentication,getComments);

export default postRouter;