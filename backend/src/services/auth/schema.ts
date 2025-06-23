import {z} from "zod";
export const RegistrationSchema=z.object({
    email:z.string().trim().email({
        message:"Please Enter valid email"
    }),
    name:z.string().trim().min(2,{
        message:"Name must be atleast 2 character long"
    }).max(30,{
        message:'Name must be at most 30 character'
    }),
    password:z.string().trim().min(8,{
        message:"Be atleast 8 character long"
    }).max(50,{
       message:"Password must be atleast 50 character long"
    })
})

export const LoginSchema=z.object({
    email:z.string().trim().email({
        message:"Please enter valid email"
    }),
 password:z.string().trim().min(1,{
    message:"Password field must not be empty"
 })
})