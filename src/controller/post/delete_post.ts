import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface AuthRequest extends Request {
  userId?: string;
}

export async function deletePost(req: AuthRequest, res: Response) {
  try {
   const userId = req.userId;
   const {postId}=req.params;

   const desiredPost=await prisma.posts.findUnique({
      where:{
         post_id:postId
      }
   });

   if(!desiredPost){
      return res.status(404).json({
         message:"post arenot found"
      });
   }

   if(desiredPost?.user_id!==userId){
      return res.status(401).json({
         message:"user are not authorized"
      });
   }
   const postDeletion= await prisma.posts.delete({
      where:
      {
         post_id:postId,
      }
   });

   if(!postDeletion){
      return res.status(404).json({
         message:"error in postDeletion"
      });
   }
  } catch (error: any) {
   return res.status(500).json({
      message: "An error occurred in deleting post",
      error: error.message,
    });
  }
}
