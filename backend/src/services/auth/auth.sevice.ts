// import bcrypt from "bcrypt";
// import prisma from "../../lib/db"; 
// import { CookieOptions, NextFunction, Request, Response } from "express";
// import { RegistrationSchema } from "./schema";
// import {authTokenService} from "./jwt-token"
// class AuthService{
//     private static instance:AuthService;
//     private readonly refreshTokenCookieOptions:CookieOptions={
//         path:"/",
//         httpOnly:true,
//         sameSite:"lax",
//         secure:process.env.NODE_ENV == "production",
//         expires:new Date(Date.now()+60*60*24*30*1000),
//         domain:undefined
//     }
//     private constructor(){}
//     public static getInstance():AuthService{
//         if(!AuthService.instance)
//         {
//             AuthService.instance=new AuthService();
//         }
//         return AuthService.instance;
//     }
//     private getHashedPassword=async(password:string):Promise<string>=>{
//         return await bcrypt.hash(password,10);
//     }
//     private newAuthenticatedResponse=async(res:Response,options:{
//         userId:number;
//         status?:number;
//         message:string;
//     })=>{
//         try{
//       const user=await prisma.user.findUnique({
//         where:{
//             id:options.userId
//         }
//       })
//       if(!user)
//       {
//         return res.status(404).json({
//             error:"User not found"
//         })
//       }
//       const accessToken:string=authTokenService.generateAccessToken({"name":"diya","email":"abc@123","username":"diya","id":"1"});
//       const refreshToken:string=authTokenService.generateRefreshToken({"name":"diya","email":"abc@123","username":"diya","id":"1"});
//       return res.status(options.status||202)
//       .setHeader("Authorization",`Bearer ${accessToken}`).cookie(
//         "refreshToken",refreshToken,this.refreshTokenCookieOptions

//       ).json({message:options.message})
//         }
//         catch(error)
//         {
//             throw error;
//         }
//     }
// }
// public register=async(req:Request,res:Response,next:
//     NextFunction
// ):Promise=>{
//     try{
// const {email,name,password}=req.body;
// const validatedData=RegistrationSchema.safeParse({
//     email,name,password
// });
// if(!validatedData.success)
// {
//     return res.status(400).json({
//         errors:
//     })
// }
// const isExist=await debugger.user.findUnique({
//     select:{
//         id:true,
//     },
//     where:{
//         email
//     }
// })
// if(isExist)
// {
//     return res.status(400).json({
//         errors:{
//             email:"Email is already registered"
//         }
//     })
// }
// const hashedPassword:string=await bcrypt.hash(
//     //using bcrypt library we can generate hash passwods


// )
// //creation of new user (but why with data we have used select?)
// //by using tokenservice need to generate json web token
// //two token got generated 1)access token 2)refresh token
// //in return we will return status
// //headers that needed to set as a accesstoken
// //set of cookie as a refreshtoken
//     }
//     catch()
//     {

//     }
// }
// //login
// //logout
// //authintercepter
// //authenticate
// //get user
//logout