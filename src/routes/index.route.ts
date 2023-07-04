import { Router } from "express";
import authRouter from "./auth.route";
import tripRouter from "./trip.route";

const router = Router();



router.use("/auth", authRouter);
router.use("/trips", tripRouter);



export default router;