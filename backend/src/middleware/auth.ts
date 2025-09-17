import Jwt  from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";
import { authTokenService } from "../../src/services/auth/jwt-token";
export const authMiddleware = (req: Request, res: Response, next: NextFunction):  void => {
    try{
        const authHeader = req.headers.authorization;
        console.log("authHeader",req.headers.authorization);
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ error: "Unauthorized access" });
            return;
        }
        const token = authHeader.split(" ")[1];
        console.log("token",token);
        // const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY as string);
        const decoded=authTokenService.verifyAccessToken(token);
        console.log("decoded",decoded);
        (req as any).user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Unauthorized access" });
        return;
    }
}