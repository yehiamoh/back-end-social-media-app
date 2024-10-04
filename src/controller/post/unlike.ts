import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface AuthRequest extends Request {
  userId?: string;
}

export async function unLike(req: AuthRequest, res: Response) {
  try {
    const { postId } = req.params; // Destructure postId from req.params
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "User is not authenticated." });
    }

    const existingLike = await prisma.likes.findUnique({
      where: {
        post_id_user_id: {
          post_id: postId,
          user_id: userId,
        },
      },
    });

    if (!existingLike) {
      return res
        .status(400)
        .json({ message: "User havenot liked this post." });
    }

    const unlike = await prisma.likes.delete({
     where:{
      post_id_user_id:{
         post_id: postId,
         user_id: userId,
      }
     }
     
    });

    return res
      .status(200)
      .json({ message: "Post deleted successfully.", date: unlike });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error in like controller",
      error: error.message,
    });
  }
}
