import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function register(req: any, res: any) {
  try {
    const { user_name, email, rawPassword, bio } = req.body;

    if (!user_name)
      return res.status(400).json({
        message: "please Enter your User Name",
      });
    if (!email)
      return res.status(400).json({
        message: "please Enter your Email",
      });
    if (!rawPassword)
      return res.status(400).json({
        message: "please Enter your Password",
      });

    const password = await bcrypt.hash(rawPassword, 12);

    const result = await prisma.user.create({
      data: {
        user_name,
        email,
        password,
        bio,
      },
    });

    if (!result) {
      return res.status(404).json({
        message: "Error in registration",
      });
    } else {
      return res.status(201).json({
        message: "user created successfully",
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.toString() });
    console.log(`error in login function ${error}`);
  }
}
