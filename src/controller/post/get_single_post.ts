import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

interface AuthRequest extends Request {
  userId?: string;
}

const prisma = new PrismaClient();

export async function getSinglePost(req: AuthRequest, res: Response) {
  try {
    const { postId } = req.params; // Extract postId from params

    // Assuming you want to fetch the post using Prisma
    const post = await prisma.posts.findUnique({
      where: {
         post_id:postId
      },
    });

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.status(200).json({data:post});
  } catch (error: any) {
    return res.status(500).json({
      message: "Error in get single post",
      error: error.message,
    });
  }
}
