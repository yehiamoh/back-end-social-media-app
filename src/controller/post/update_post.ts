import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface AuthRequest extends Request {
  userId?: string;
}

export async function updatePost(req: AuthRequest, res: Response) {
  try {
    const userId = req.userId;
    const { postId } = req.params;

    const { content, mediaUrl } = req.body;

    if (!content) {
      return res.status(400).json({
        message: "content not found",
      });
    }

    const desiredPost = await prisma.posts.findUnique({
      where: {
        post_id: postId,
      },
    });

    if (!desiredPost) {
      return res.status(404).json({
        message: "post arenot found",
      });
    }
    const currentMediaUrl = mediaUrl || desiredPost.media_url;

    if (desiredPost?.user_id !== userId) {
      return res.status(401).json({
        message: "user are not authorized",
      });
    }
    const updatedPost = await prisma.posts.update({
      where: {
        post_id: postId,
      },
      data: {
        content: content,
        media_url: currentMediaUrl,
      },
    });

    if (!updatedPost) {
      return res.status(404).json({
        message: "error in postDeletion",
      });
    }
    return res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost, // Return the updated post
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "An error occurred in deleting post",
      error: error.message,
    });
  }
}
