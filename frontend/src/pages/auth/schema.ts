import { z } from 'zod';
export const loginSchema=z.object({
    email:z.string().email("Invalid email format"),
    password:z.string().min(6,"Password must be at least 6 characters long").max(100, 'Password must not exceed 100 characters')

})
export const signupSchema=z.object({
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
    }).max(100,{
       message:"Password must be atleast 100 character long"
    })
})