import { ILogin, IUserResponse, IUser } from "../types/user.types";
import { User } from "../user/user.entities";
import { CustomError } from "../utils/error.utils";
import { compareSync, hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";

export const handleRegister = async (user: IUser): Promise<IUserResponse> => {
  try {
    const userExists = await User.findOne({ email: user.email });
    if (userExists) {
      throw new CustomError("User already exists", 400);
    }
    const hashedPassword = hashSync(
      user.password,
      Number(process.env.SALT) || 10
    );
    const newUser = new User({
      ...user,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const {
      password, 
      
      travelHistory,
      travelInterests,
      updatedAt,
      createdAt,
      ...userDetails
    } = savedUser.toObject();

    return userDetails as IUserResponse;
  } catch (error) {
    throw error;
  }
};

export const handleLogin = async (
  loginData: ILogin
): Promise<{
  user: IUserResponse;
  token: {
    accessToken: string;
    refreshToken: string;
  };
}> => {
  try {
    const user = await User.findOne({ email: loginData.email });
    if (!user) {
      throw new CustomError("User does not exist", 400);
    }
    const isPasswordValid = compareSync(loginData.password, user.password);
    if (!isPasswordValid) {
      throw new CustomError("Invalid Credential", 400);
    }

    const accessToken = sign(
      { id: user._id,
        role : user.role
      },
      process.env.ACCESS_TOKEN_SECRET || "",
      {
        expiresIn: "1d"
      }
    );

    const refreshToken = sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET || "",
      {
        expiresIn: "7d",
      }
    );

    const {
      
      password,
    
      travelHistory,
      travelInterests,
      updatedAt,
      createdAt,
      ...userDetails
    } = user.toObject();

    return {
      user: userDetails as IUserResponse,
      token: {
        accessToken,
        refreshToken,
      },
    };
  } catch (error) {
    throw error;
  }
};

