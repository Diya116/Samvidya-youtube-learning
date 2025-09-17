import { Request, Response } from "express";
import prisma from "../../lib/db";
import { userSchema } from "./schema";
interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    name?: string;
    email?: string;
    [key: string]: any;
  };
}
export const updateUser = async (req: Request, res: Response) => {
  try{
     const authReq = req as AuthenticatedRequest;
    const userId = authReq.user?.id;
      if (!userId) {
      res.status(401).json({ error: "Unauthorized access" });
      return;
    }
      const validateData = userSchema.partial().safeParse(req.body);
       if (!validateData.success) {
       res.status(400).json({ error: validateData.error.errors });
       return;
    }
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: validateData.data,
    });

     res.status(200).json({ message: "User updated successfully" });
     return;
  }
  catch(error)
  {
console.error("Error while updating note:", error);
     res.status(500).json({ error: "Internal Server Error" });
     return;
  }
};

