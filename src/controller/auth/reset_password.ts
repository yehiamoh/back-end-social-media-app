import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function resetPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, newRawPassword } = req.body;

  if (!email || !newRawPassword) {
    return res.status(400).json({
      message: "Please provide your email and new password",
    });
  }

  try {
    const newPassword = await bcrypt.hash(newRawPassword, 10);
    const user = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password: newPassword,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "Password has been updated successfully",
      user: user.email,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "An error occurred while resetting the password",
      error: error.message,
    });
  }
}
