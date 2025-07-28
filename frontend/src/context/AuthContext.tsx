import { useState,useEffect,useContext,createContext,useCallback} from "react";
import type { ReactNode } from "react";
import { loginUserapi,signupUserapi,logoutUserapi } from "@/services/authService";
import type { SignupForm,LoginFormType } from "@/types/auth";


type User={
    name:string;
    email:string;
    [key:string]:any;
}

type AuthContextType = {
    user:User |null;
    isAuthenticated:() => boolean;
    token:string | null;
    login: (formData: LoginFormType) => Promise<void>;
    signup:(formData:SignupForm)=> Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext=createContext<AuthContextType|undefined>(undefined);

export const AuthProvider=({children}:{children:ReactNode})=>{
    const[user,setUser]=useState<User|null>(null);
    const[token,setToken]=useState<string|null>(null);
     useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser) as User);
  }, []);
    const login=useCallback(async(form:LoginFormType)=>{
        const res=await loginUserapi(form);
        if(res.success)
        {
            const accessToken=res.token||"";
            localStorage.setItem("token",accessToken);
            setToken(accessToken);
            setUser(res.data?.user||null);
            localStorage.setItem("user",JSON.stringify(res.data?.user));
        }
        else{
            console.error("Login failed:", res.error);
            throw new Error(res.error || "Login failed");
        }
    },[]);
    const signup=useCallback(async(form:SignupForm)=>{
        const res=await signupUserapi(form);
        if(res.success)
        {
            const accessToken=res.token||"";
            localStorage.setItem("token",accessToken);
            setToken(accessToken);
            setUser(res.data?.user||null);
            localStorage.setItem("user",JSON.stringify(res.data?.user));
        }
        else{
            console.error("Signup failed:", res.error);
            throw new Error(res.error || "Signup failed");
        }
    },[])
    const logout=useCallback(async()=>{
        const res=await logoutUserapi();
        if(res.success)
        {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setToken(null);
            setUser(null);
            window.location.href = '/auth/login'; // Redirect to login page after logout
        }
        else{
            console.error("Logout failed:", res.error);
            throw new Error(res.error || "Logout failed");
        }
    },[])
    const isAuthenticated= useCallback((): boolean => {
        return !!token;
    }, [token]);
    const value={
        user,
        token,
        isAuthenticated,
        login,
        signup,
        logout
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>{
    const context=useContext(AuthContext);
    if(!context)
    {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}