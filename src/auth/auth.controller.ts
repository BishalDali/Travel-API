import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/error.utils";
import { handleLogin, handleRegister } from "./auth.service";
import { IUserResponse } from "../types/user.types";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await handleRegister(req.body);
    res.status(201).json({
      statusCode: 201,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user : {
        user : IUserResponse,
        token : {
            accessToken : string,
            refreshToken : string
        }
    } = await handleLogin(req.body);
    res.cookie("accessToken", user.token.accessToken, {
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "none",
    });
    res.cookie("refreshToken", user.token.refreshToken, {
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "none",
    });
    res
      .status(200)
      .json({ message: "User Logged In Successfully", data: user.user });
  } catch (error) {
    next(error);
  }
};


export const logout = async (req : Request, res : Response, next : NextFunction) => {
  try {
    res.clearCookie("accessToken", { path: "/" });
    res.clearCookie("refreshToken", { path: "/" });
    res.status(200).json({ message: "User Logged Out Successfully" });
  } catch (error) {
    next(error);
    
  }
}
