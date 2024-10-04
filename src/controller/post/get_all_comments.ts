import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { date } from "joi";
const prisma = new PrismaClient();

interface AuthRequest extends Request {
  userId?: string;
}

export async function getComments(req: AuthRequest, res: Response) {
  try {
    const { postId } = req.params;
    const comments=await prisma.comments.findMany({
      where:{
         post_id:postId,
      },
      orderBy:{
         created_At:"asc"
      }
    })
    

    return res.status(200).json({
      message:"comments retrieved successfully",
      data:comments
    })
  } catch (error: any) {
    return res.status(500).json({
      message: "Error in adding comment",
      error: error.message,
    });
  }
}
