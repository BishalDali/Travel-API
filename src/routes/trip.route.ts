import { Router } from "express";
import { createTrip, getTrips, deleteTrip, getTrip, addToFavorites, removeFromFavorites} from "../trips/trip.controller";
import { authGuard } from "../auth/auth.guard";
import { validateSchema } from "../utils/validate.utils";
import { tripSchema } from "../trips/trip.validator";


import uploadImages from "../utils/image.utils";

const tripRouter = Router();


tripRouter.post("/", authGuard("admin"), uploadImages, validateSchema(tripSchema), createTrip);
tripRouter.get("/", getTrips);
tripRouter.delete("/:id", authGuard("admin"), deleteTrip);
tripRouter.get("/:id", getTrip);
tripRouter.post("/:id/favorites", authGuard("user"), addToFavorites);
tripRouter.delete("/:id/favorites", authGuard("user"), removeFromFavorites);

export default tripRouter
