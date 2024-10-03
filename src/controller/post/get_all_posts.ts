import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma= new PrismaClient();
export async function getPosts(req:Request,res:Response){
   try{
      const result=await prisma.posts.findMany();
      if(!result){
         return res.status(404).json({
            message:"Error in fetching posts"
         });
      }
      res.status(200).json({
         message:"Posts retrieved successfully ",
         data:result
      })
   }
   catch(error:any){
      return res.status(500).json({
         message: "An error occurred in fetching posts",
         error: error.message,
       });
   }
   
}