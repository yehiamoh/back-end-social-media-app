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
    let currentMediaUrl = "";

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

    !mediaUrl
      ? currentMediaUrl != desiredPost.media_url
      : (currentMediaUrl = mediaUrl);

    if (desiredPost?.user_id !== userId) {
      return res.status(401).json({
        message: "user are not authorized",
      });
    }
    const postUpdate = await prisma.posts.update({
      where: {
        post_id: postId,
      },
      data: {
        content: content,
        media_url: currentMediaUrl,
      },
    });

    if (!postUpdate) {
      return res.status(404).json({
        message: "error in postDeletion",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: "An error occurred in deleting post",
      error: error.message,
    });
  }
}
