import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function register(req: any, res: any) {
  try {
    const { user_name, email, password, bio } = req.body;

    console.log({ user_name, email, password, bio });

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
