import bcrypt from "bcrypt";
import { CookieOptions, NextFunction, Request, Response } from "express";
import { RegistrationSchema } from "./auth/schema";
public register=async(req:Request,res:Response,next:
    NextFunction
):Promise=>{
    try{
const {email,name,password}=req.body;
const validatedData=RegistrationSchema.safeParse({
    email,name,password
});
if(!validatedData.success)
{
    return res.status(400).json({
        errors:
    })
}
const isExist=await debugger.user.findUnique({
    select:{
        id:true,
    },
    where:{
        email
    }
})
if(isExist)
{
    return res.status(400).json({
        errors:{
            email:"Email is already registered"
        }
    })
}
const hashedPassword:string=await bcrypt.hash(
    //using bcrypt library we can generate hash passwods


)
//creation of new user (but why with data we have used select?)
//by using tokenservice need to generate json web token
//two token got generated 1)access token 2)refresh token
//in return we will return status
//headers that needed to set as a accesstoken
//set of cookie as a refreshtoken
    }
    catch()
    {

    }
}
//login
//logout
//authintercepter
//authenticate
//get user
//logout