import jwt from "jsonwebtoken";
import { env } from "../../../config/env";
import Logger from "../../lib/logger";
import { UserPayloadPrivate } from "../../types/auth";
class AuthTokenService {
  private static instance: AuthTokenService;
  private constructor() {}
  public static getInstance(): AuthTokenService {
    if (!AuthTokenService.instance) {
      AuthTokenService.instance = new AuthTokenService();
    }
    return AuthTokenService.instance;
  }
  public generateAccessToken = (userPayload: UserPayloadPrivate): string => {
    try {
      return jwt.sign(userPayload, env.accessTokenSecretKey, {
        expiresIn: "30d",
      });
    } catch (error) {
      Logger.error(error);
      throw new Error("Access token generation failed");
    }
  };
  public generateRefreshToken = (userpayload: UserPayloadPrivate): string => {
    try {
      return jwt.sign(userpayload, env.refreshTokenSecretKey, {
        expiresIn: "15m",
      });
    } catch (error) {
      Logger.error(error);
      throw new Error("Refresh token generation failed");
    }
  };
  public verifyAccessToken = (token: string): UserPayloadPrivate => {
    try {
      console.log("verifying...")
      const payload = jwt.verify(token, env.accessTokenSecretKey);
      console.log(payload);
      return payload as UserPayloadPrivate;
    } catch (error) {
      Logger.error(error);
      throw new Error("JWT token verification failed");
    }
  };
  public verifyRefreshToken = (token: string): UserPayloadPrivate => {
    try {
      const payload = jwt.verify(token, env.refreshTokenSecretKey);
      return payload as UserPayloadPrivate;
    } catch (error) {
      Logger.error(error);
      throw new Error("JWT token verification failed");
    }
  };
}
export const authTokenService = AuthTokenService.getInstance();
