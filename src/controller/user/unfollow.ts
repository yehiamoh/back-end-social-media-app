import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface AuthRequest extends Request {
  userId?: string;
}

export async function unfollow(
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
    if (currentUser === followedUserId) {
      return res.status(400).json({ message: "You cannot unfollow yourself" });
    }    
    const existingFollow = await prisma.follows.findUnique({
      where: {
        follower_id_following_id: {
          follower_id: currentUser,
          following_id: followedUserId,
        },
      },
    });
    if (!existingFollow) {
      return res
        .status(404)
        .json({ message: "there are no follow between two users" });
    }

    const unfollowAction = await prisma.follows.delete({
      where: {
        follower_id_following_id: {
          follower_id: currentUser,
          following_id: followedUserId,
        },
      },
    });

    res.status(200).json({
      message: "UnFollow Action had been made",
      data: unfollowAction,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "An error occurred while Follow",
      error: error.message,
    });
  }
}
