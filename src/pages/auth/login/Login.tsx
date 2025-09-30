import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

//schema and type
import { loginSchema } from "../schema";
import type { LoginFormType} from "@/types/auth";

//API service
// import { loginUserapi } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";

//UI COMPONENTS
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const LoginForm = () => {
  const navigate = useNavigate();
  const {login}=useAuth();
  const [formData, setFormData] = useState<LoginFormType>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
useEffect(()=>{
  // const {isAuthenticated}=useAuth();
  //isAuthenticated value is not working in useEffect
  // console.log("clg",isAuthenticated)

}, []);
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (): Promise<void> => {
    //1)email and password both required
    if(formData.email.trim() === "" || formData.password.trim() === "") {
      setError("Email and password both required" );  
      return;
    }
    //2)validate data using zod schema
    const validateData = loginSchema.safeParse(formData);
    if (!validateData.success) {
      setError(validateData.error.errors[0].message);   
      return;
    }
    try {
      setIsLoading(true);
       await login(formData);
      setIsLoading(false);
      // if (!response.success) {
      //   setError(response.error);    
      //   return;
      // }
      toast.success("Login successful");
      navigate("/workspace/courses");  

    } catch (error:any) {
      setIsLoading(false);
      console.error("Error during login:", error);
         if (error.response?.status === 401) {
      const errorMessage = "User not Registered";
      // setError(errorMessage);
      toast.error(errorMessage);
      
      // Optional: Show login suggestion or redirect
      // setTimeout(() => navigate("/login"), 2000);
    } else {
      // Handle other errors generically
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          "An error occurred during signup. Please try again.";
      // setError(errorMessage);
      toast.error(errorMessage);
    }
      // toast.error("An error occurred during login. Please try again later.");
    }
  };
   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };
  //const {isAuthenticated}=useAuth();
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
{/* {
  isAuthenticated() && (
   <Navigate to="/workspace" replace />
  )
} */}
      <div className="w-full max-w-md">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-4 bg-red-200 border-red-700">
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="mb-2">Email <span className="text-red-600">*</span></Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="password" className="mb-2">Password<span className="text-red-600">*</span></Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </div>

              <Button
                type="button"
                className="w-full cursor-pointer text-foreground"
                disabled={isLoading}
                onClick={handleSubmit}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/auth/signup")}
                  className="text-foreground hover:underline font-medium cursor-pointer"
                  type="button"
                >
                  Sign up
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
