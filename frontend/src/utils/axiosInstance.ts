import axios from "axios";
 const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
export const api=axios.create({
    baseURL:BACKEND_BASE_URL,
    withCredentials:true 
})

api.interceptors.request.use(
    (config)=>{
        const token=localStorage.getItem("token");
       if(token)
       {
        config.headers.Authorization=`${token}`;
       }
       return config;
    }
)

api.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        if(error.response.status===401)
        {
            console.error("Unauthorized request, redirecting to login");
            window.location.href="/login"; // Redirect to login page
        }
        return Promise.reject(error);
    }
)