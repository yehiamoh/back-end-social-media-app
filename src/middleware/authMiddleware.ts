import {Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

 interface AuthRequest extends Request{
   userId:string;
}

export function ensureAuthentication(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      message: "Access token missing",
    });
  }
  try {
    const decodedAcsessToken = Jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as Jwt.JwtPayload;
    
    req.userId=decodedAcsessToken.userId;

    next();
  } catch (error: any) {
    res.status(500).json({ message: error.toString() });
  }
}
