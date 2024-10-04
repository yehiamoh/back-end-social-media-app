import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();


interface AuthRequest extends Request {
   userId?: string;
 }
 
export async function feed(req:AuthRequest,res:Response) {
   try{
      const userId=req.userId;

      const followedUsers = await prisma.follows.findMany({
         where:{
            follower_id:userId
         },
         select:{
            following_id:true,
         }
      });

      const followingIds=followedUsers.map(follow=>follow.following_id);
      const feed= await prisma.posts.findMany({
         where:{
            user_id:{in:followingIds}
         },
         include:{
            author:{
               select:{
                  user_name:true,
               }
            },
            likes:true,
            comment:true,
         },
         orderBy:{
            created_at:'asc'
         }
      });

      return res.status(200).json({
         message:"User feed",
         feed:feed
      })
   }
   catch(error:any){
      return res.status(500).json({
         message:"Error in feed controller",
         error:error.message
      });
   }
}