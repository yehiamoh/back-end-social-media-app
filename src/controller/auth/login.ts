import { Response,Request } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import Joi from "joi";
import { generateAccessToken,generateRefreshToken } from "../../util/generateToken";

const prisma = new PrismaClient();

export async function login(req:Request,res:Response) {
   try{
      const schema= Joi.object({
         email: Joi.string().email().required(),
         rawPassword: Joi.string().min(8).required(),
       });

       const {error}=schema.validate(req.body);
       if(error){
        return res.status(400).json({
            message :error.details[0].message
         });
       } 

       const {email,rawPassword}=req.body;

       if(!email){
         return res.status(400).json({
            message: "email required",
         });
       }
       if(!rawPassword){
         return res.status(400).json({
            messsage:"password required",
         })
       }
       
       const user= await prisma.user.findFirst({
         where : {
            email:email,
         }
       });
       if(!user){
         return res.status(400).json({
            message:"Invalid credintial"
         })
       }

       const comparingPassword= await bcrypt.compare(rawPassword,user!.password)

       if(!comparingPassword){
         return res.status(400).json({
            message: "Invalid credentials",
          });
       }

       const accessToken =generateAccessToken(user.user_id);

       if(!accessToken){
         return res.status(404).json({
            message : "Error in generating token"
         });
       }

        res.status(200).json({
         message:"successful login",
         id:user.user_id,
         username:user.user_name,
         token:accessToken,
        })

   }
   catch(error:any){
      res.status(500).json({
         message:error.toString()
      });
   }
}
