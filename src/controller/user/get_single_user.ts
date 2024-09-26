import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface AuthRequest extends Request {
  userId?: string;
}

export async function getCurrentUser(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        user_id: req.userId,
      },
    });

    //console.log(req.userId);
    if (!user) {
      return res.status(400).json({
        message: "Error in finding user",
      });
    }
    res.status(200).json({
      message: "user retrieved successfully",
      data: user,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "error in auth middle ware", error: error.message });
  }
}
