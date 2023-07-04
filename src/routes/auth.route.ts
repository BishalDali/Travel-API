import { Router } from "express";
import { login, register, logout } from "../auth/auth.controller";
import { validateSchema } from "../utils/validate.utils";
import { userSchema, loginSchema } from "../user/user.validator";
const authRouter = Router();



authRouter.post("/register", validateSchema(userSchema), register);
authRouter.post("/login", validateSchema(loginSchema), login);
authRouter.post("/logout", logout);





export default authRouter;