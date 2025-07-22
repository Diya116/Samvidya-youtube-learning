import { api } from "@/utils/axiosInstance";
import type { LoginFormType,SignupForm } from "@/types/auth";
 const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
export const loginUserapi=async ({email,password}:LoginFormType)=>{
    try{
        console.log("Login API called with email:", email);
        const response=await api.post(`${BACKEND_BASE_URL}/auth/login`,{
            email,
            password
        });
        localStorage.setItem("token",response.headers.authorization);
        console.log("Login response:", response.data);
        return {success:true,data:response.data,token:response.headers.authorization}
    }
    catch(err:any)
    {
        console.error("Login failed:", err);
        return {success:false,error:err.response.data.error};
    }
}

export const signupUserapi=async({name,email,password}:SignupForm)=>{
    try{
        const response=await api.post(`${BACKEND_BASE_URL}/auth/register`,{
            name,
            email,
            password
        });
         localStorage.setItem("token",response.headers.authorization);
        return {success:true,data:response.data,token:response.headers.authorization}
    }
    catch(err:any)
    {
        console.error("Signup failed:", err);
        return {success:false,error:err.response?.data?.message || "Signup failed"};
    }

}

export const logoutUserapi=async()=>{
    try{
        const response=await api.post(`${BACKEND_BASE_URL}/auth/logout`,{},{
            withCredentials:true
        });
        localStorage.removeItem("token");
        return {success:true,data:response.data}
    }
    catch(err:any)
    {
        console.error("Logout failed:", err);
        return {success:false,error:err.response?.data?.message || "Logout failed"};
    }
}