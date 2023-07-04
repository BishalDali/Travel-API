import { verify, VerifyErrors } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/error.utils";

export interface AuthenticatedRequest extends Request {
    user?: {
      role: string;
      id: string;
    };
  }

export const authGuard = (role?: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const cookie = req.cookies["accessToken"];
    
    if (!cookie) {
      return next(new CustomError("You Need to Login!", 401));
    }
    try {
      const payload = verify(
        cookie,
        process.env.ACCESS_TOKEN_SECRET || ""
      ) as { role: string, id: string }; 
        

      if (role !== payload.role && payload.role !== "admin") {
    
        return next(new CustomError("Unauthorized", 403));
      }
      req.user = payload;
      next();
    } catch (error) {
      return next(new CustomError("Unauthenticated", 401));
    }
  };
};