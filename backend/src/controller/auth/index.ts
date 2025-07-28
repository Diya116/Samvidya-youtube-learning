import {Request,Response,NextFunction} from "express";
import { authService } from "../../services/auth/auth.sevice";

class AuthController{
    private static instance:AuthController;
    private constructor() {}

    public static getInstance(): AuthController {
        if (!AuthController.instance) {
            AuthController.instance = new AuthController();
        }
        return AuthController.instance;
    }

    public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await authService.register(req, res, next);
        } catch (error) {
            console.error(error);
            if (!res.headersSent) {
                res.status(500).json({ error: "Something went wrong!" });
            }
        }
    };

    public login=async(req:Request,res:Response):Promise<void>=>{
        try{
  await authService.login(req,res);
        }
        catch(error){
 console.error(error);
            if (!res.headersSent) {
                res.status(500).json({ error: "Something went wrong!" });
            }

        }
    }
    public logout=async(req:Request,res:Response)=>{
        try{
     authService.logout(req,res);
        }
        catch(error)
        {
 if (!res.headersSent) {
                res.status(500).json({ error: "Something went wrong!" });
            }

        }
    }
}

export const authController = AuthController.getInstance();