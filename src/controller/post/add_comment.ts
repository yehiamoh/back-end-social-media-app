import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface AuthRequest extends Request {
  userId?: string;
}

export async function addCommnet(req:AuthRequest,res:Response){
   try{
      const {postId}=req.params;
      const userId=req.userId;
      const text=req.body;
      if(!userId){
         return res.status(403).json({
            message:"User arenot authorized."
         });
      }
      const comment=await prisma.comments.create({
         data:{
            user_id:userId,
            post_id:postId,
            text:text
         }
      });
      return res.status(200).json({
         message:"commment created sucessfully",
         data:comment
      })
   }
   catch(error:any){
      return res.status(500).json({
         message:"Error in adding comment",
         error:error.message
      })
   }
   
}