import { useState, useEffect, useContext, createContext, useCallback } from "react";
import type { ReactNode } from "react";
import { loginUserapi, signupUserapi, logoutUserapi } from "@/services/authService";
import type { SignupForm, LoginFormType } from "@/types/auth";

type User = {
    name: string;
    email: string;
    [key: string]: any;
}

type AuthContextType = {
    user: User | null;
    isAuthenticated: () => boolean;
    token: string | null;
    login: (formData: LoginFormType) => Promise<void>;
    signup: (formData: SignupForm) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = () => {
            try {
                const storedToken = localStorage.getItem("token");
                const storedUser = localStorage.getItem("user");
                
                if (storedToken) {
                    setToken(storedToken);
                }
                
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser) as User;
                    setUser(parsedUser);
                }
            } catch (error) {
                console.error("Error initializing auth:", error);
                // Clear corrupted data
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const login = useCallback(async (form: LoginFormType) => {
        const res = await loginUserapi(form);
        
        if (res.success) {
            const accessToken = res.token || "";
            const userData = res.data?.user || null;
            
            // Update localStorage
            localStorage.setItem("token", accessToken);
            if (userData) {
                localStorage.setItem("user", JSON.stringify(userData));
            }
            
            // Update state
            setToken(accessToken);
            setUser(userData);
        } else {
            // Throw error with message from service
            throw new Error(res.error || "Login failed");
        }
    }, []);

    const signup = useCallback(async (form: SignupForm) => {
        const res = await signupUserapi(form);
        
        if (res.success) {
            const accessToken = res.token || "";
            const userData = res.data?.user || null;
            
            // Update localStorage
            localStorage.setItem("token", accessToken);
            if (userData) {
                localStorage.setItem("user", JSON.stringify(userData));
            }
            // Update state
            setToken(accessToken);
            setUser(userData);
        } else {
            // Throw error with message from service
            throw new Error(res.error || "Signup failed");
        }
    }, []);

    const logout = useCallback(async () => {
        // Call API which handles localStorage cleanup
        const res = await logoutUserapi();
        
        // Clear state regardless of API response
        setToken(null);
        setUser(null);
        
        if (!res.success) {
            console.warn("Logout API failed but local state cleared:", res.error);
        }
        
        // Redirect to login
        window.location.href = '/auth/login';
    }, []);

    const isAuthenticated = useCallback((): boolean => {
        return !!token && !!user;
    }, [token, user]);

    const value = {
        user,
        token,
        isAuthenticated,
        login,
        signup,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}; 
