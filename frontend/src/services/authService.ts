import { api } from "@/utils/axiosInstance";
import type { LoginFormType, SignupForm } from "@/types/auth";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

// Unified response type
type AuthResponse = {
  success: boolean;
  data?: any;
  token?: string;
  error?: string;
};

export const loginUserapi = async ({ email, password }: LoginFormType): Promise<AuthResponse> => {
  try {
    console.log("Login API called with email:", email);
    const response = await api.post(`${BACKEND_BASE_URL}/auth/login`, {
      email,
      password
    });
    
    const token = response.headers.authorization;
    console.log("Login response:", response.data);
    
    // Return data without setting localStorage - let context handle it
    return { 
      success: true, 
      data: response.data, 
      token 
    };
  } catch (err: any) {
    console.error("Login failed:", err);
    return {
      success: false,
      error: err.response?.data?.message || err.response?.data?.error || "Login failed"
    };
  }
};

export const signupUserapi = async ({ name, email, password }: SignupForm): Promise<AuthResponse> => {
  try {
    console.log("Signup API called with email:", email);
    const response = await api.post(`${BACKEND_BASE_URL}/auth/register`, {
      name,
      email,
      password
    });
    
    const token = response.headers.authorization;
    console.log("Signup response:", response.data);
    
    // Return data without setting localStorage - let context handle it
    return { 
      success: true, 
      data: response.data, 
      token 
    };
  } catch (err: any) {
    console.error("Signup failed:", err);
    
    // Handle specific error cases
    if (err.response?.status === 406) {
      return {
        success: false,
        error: "Email already registered. Please login instead."
      };
    }
    
    return {
      success: false,
      error: err.response?.data?.message || err.response?.data?.error || "Signup failed"
    };
  }
};

export const logoutUserapi = async (): Promise<AuthResponse> => {
  try {
    const response = await api.delete(`${BACKEND_BASE_URL}/auth/logout`);
    
    // Clear localStorage here since it's session-ending operation
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    return { 
      success: true, 
      data: response.data 
    };
  } catch (err: any) {
    console.error("Logout failed:", err);
    
    // Still clear localStorage even if API fails
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    return {
      success: false,
      error: err.response?.data?.message || err.response?.data?.error || "Logout failed"
    };
  }
};