import Jwt  from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";
export const authMiddleware = (req: Request, res: Response, next: NextFunction):  void => {
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ error: "Unauthorized access" });
            return;
        }
        const token = authHeader.split(" ")[1];
        const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY as string);
        (req as any).user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Unauthorized access" });
        return;
    }
}