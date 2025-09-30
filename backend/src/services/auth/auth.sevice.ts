import bcrypt from "bcrypt";
import prisma from "../../lib/db";
import { CookieOptions, NextFunction, Request, Response } from "express";
import { RegistrationSchema } from "./schema";
import { authTokenService } from "./jwt-token";
import {
  AuthResponse,
  UserPayloadPrivate,
  UserPayloadPublic,
} from "../../types/auth";
class AuthService {
  private static instance: AuthService;
  private readonly refreshTokenCookieOptions: CookieOptions = {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV == "production",
    expires: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
    domain: undefined,
  };
  private constructor() {}
  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }
  private getHashedPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
  };
  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, password } = req.body;
      const validatedData = RegistrationSchema.safeParse({
        email,
        password,
        name,
      });
      if (!validatedData.success) {
        return res.status(406).json({
          error: validatedData.error,
        });
      }
      const isExist = await prisma.user.findUnique({
        select: {
          id: true,
        },
        where: {
          email: validatedData.data.email,
        },
      });
      if (isExist) {
        console.log("user already exist")
        return res.status(406).json({
          error: "Email is already exist",
        });
      } 
      const hashedPassword: string = await this.getHashedPassword(
        validatedData.data.password
      );
      const user = await prisma.user.create({
        data: {
          email: validatedData.data.email,
          name: validatedData.data.name,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      if (!user) {
        throw new Error("Failed to user create");
      }
      const accessToken: string = authTokenService.generateAccessToken(
        user as UserPayloadPrivate
      );
      const refreshToken: string = authTokenService.generateRefreshToken(
        user as UserPayloadPrivate
      );
      return res
        .status(200)
        .setHeader("Authorization", `Bearer ${accessToken}`)
        .cookie("refreshToken", refreshToken, this.refreshTokenCookieOptions)
        .json({
          message: "Registed successfully",
          user: { email: user.email, name: user.name },
        });
    } catch (err: any) {
      return next(err);
    }
  };
  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({
        select: {
          email: true,
          password: true,
          name: true,
          id: true,
        },
        where: {
          email,
        },
      });
      if (!user) {
        return res.status(404).json({ error: "user not exist" });
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "invalid password" });
      }
      const accessToken: string = authTokenService.generateAccessToken({
        email: user.email,
        id: user.id,
        name: user.name,
      } as UserPayloadPrivate);
      const refreshToken: string = authTokenService.generateRefreshToken({
        email: user.email,
        id: user.id,
        name: user.name,
      } as UserPayloadPrivate);
      return res
        .status(200)
        .setHeader("Authorization", `Bearer ${accessToken}`)
        .cookie("refreshToken", refreshToken, this.refreshTokenCookieOptions)
        .json({
          message: "logged in successfully",
          user: { email: user.email, name: user.name } as UserPayloadPublic,
        });
    } catch (err) {
      console.log(err);
    }
  };

  public logout = (req: Request, res: Response) => {
    try {
      res.clearCookie("refreshToken", { maxAge: 0 });
      return res.status(200).json({ message: "loggedout successfully!!" });
    } catch (error) {
      console.log(error);
    }
  };

  public authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const accessToken: string | null =
        req.headers.authorization?.split(" ")[1] || null;
      if (
        !accessToken ||
        accessToken == "" ||
        accessToken == null ||
        accessToken == "null"
      ) {
        throw new Error("Access token not found");
      }
      const userPayload: UserPayloadPrivate =
        authTokenService.verifyAccessToken(accessToken);
      if (!userPayload || !userPayload?.id) {
        throw new Error("Invalid Access Token");
      }
      //req.user=userPayload
    } catch (error) {}
  };
 public refreshToken = async (req: Request, res: Response) => {
  try {
    // Ensure cookies are parsed (need cookie-parser middleware)
    const refreshToken = req.cookies?.refreshToken;
    console.log("Cookies from request:", req.cookies);
    console.log("Refresh token from request:", refreshToken);

    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token not found" });
    }

    let userPayload;
    try {
      userPayload = authTokenService.verifyRefreshToken(refreshToken);
    } catch (err:any) {
      if (err.name === "TokenExpiredError") {
        console.error("Refresh token expired:", err);
        return res.status(401).json({ error: "Refresh token expired" });
      }
      console.error("Error verifying refresh token:", err);
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    if (!userPayload) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    console.log("User payload from refresh token:", userPayload);
    
    const newAccessToken = authTokenService.generateAccessToken({id:userPayload.id,email:userPayload.email,name:userPayload.name} as UserPayloadPrivate);
    
    return res.status(200).json({ accessToken: newAccessToken });

  } catch (error) {
    console.error("Unexpected error refreshing token:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
}
export const authService = AuthService.getInstance();
