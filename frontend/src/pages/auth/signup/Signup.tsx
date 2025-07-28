import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

//schema and type
import { signupSchema } from "../schema";
import type { SignupForm} from "@/types/auth";

//API service
//import { signupUserapi } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
//UI COMPONENTS
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";


const Signup= () => {
  const navigate = useNavigate();
  const {signup}=useAuth();
  const [formData, setFormData] = useState<SignupForm>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    if(formData.name.trim() === "" ||formData.email.trim() === "" || formData.password.trim() === "") {
      setError("name,Email,password both required" );  
      return;
    }
    //2)validate data using zod schema
    const validateData = signupSchema.safeParse(formData);
    if (!validateData.success) {
      setError(validateData.error.errors[0].message);   
      return;
    }
    try {
      setIsLoading(true);
      // const response = await signupUserapi(formData);
      await signup(formData);
      setIsLoading(false);
      // if (!response.success) {
      //   setError(response.error);    
      //   return;
      // }
      toast.success("Signup successful");
      navigate("/workspace");  

    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again later.");
    }
  };
   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Welcome to Samvidya</CardTitle>
            <CardDescription>
              Create new account to continue
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
                <Label htmlFor="email" className="mb-2">name <span className="text-red-600">*</span></Label>
                <Input
                  id="name"
                  name="name"
                  type="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

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
                <Label htmlFor="password" className="mb-2">Password</Label>
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
                className="w-full"
                disabled={isLoading}
                onClick={handleSubmit}
              >
                {isLoading ? "Signing in..." : "Sign Up"}
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Already have account?{" "}
                <button
                  onClick={() => navigate("/auth/login")}
                  className="text-black hover:underline font-medium dark:text-white"
                  type="button"
                >
                  Log in
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;