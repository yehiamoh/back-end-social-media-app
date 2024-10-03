import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// AuthRequest should extend from Request and include userId and a correctly typed body
interface AuthRequest extends Request {
  userId?: string;
}

export async function addPost(req: AuthRequest, res: Response) {
  try {
    const { content, media_url } = req.body;

    if (!content) {
      return res.status(400).json({
        message: "please enter your content",
      });
    }

    const result = await prisma.posts.create({
      data: {
        author: {
          connect: {
            user_id: req.userId, // Assuming req.userId is set via authentication middleware
          },
        },
        content: content,
        media_url: media_url,
      },
    });

    return res.status(201).json({
      message: "Post created successfully",
      post: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error in adding post",
      error: error.message,
    });
  }
}
