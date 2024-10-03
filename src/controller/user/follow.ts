import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface AuthRequest extends Request {
  userId?: string;
}

export async function follow(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const currentUser = req.userId;
    if (!currentUser) {
      return res.status(400).json({ message: "current user id is required" });
    }
    const followedUserId = req.params.id;
    if (!followedUserId) {
      return res.status(400).json({ message: "followed user id is required" });
    }
    const existingFollow = await prisma.follows.findUnique({
      where: {
        follower_id_following_id: {
          follower_id: currentUser,
          following_id: followedUserId,
        },
      },
    });
    if (existingFollow) {
      return res
        .status(409)
        .json({ message: "You are already following this user" });
    }

    const followAction = await prisma.follows.create({
      data: {
        follower_id: currentUser,
        following_id: followedUserId,
      },
    });

    res.status(200).json({
      message: "Follow Action had been made",
      data: followAction,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "An error occurred while Follow",
      error: error.message,
    });
  }
}
