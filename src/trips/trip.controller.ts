import { NextFunction, Request, Response } from "express";
import { handleCreateTrip, handleGetTrips,
    handleDeleteTrip,
    handleGetTrip,
    handleAddToFavorites,
    handleRemoveFromFavorites
} from "./trip.service";
import { AuthenticatedRequest } from "../auth/auth.guard";



export const createTrip = async (req : Request, res: Response, next : NextFunction) => {
    try {

        const trip = await handleCreateTrip({
            ...req.body
        });
        res.status(201).json({
            message : "Trip created successfully",
        })
    } catch (error) {
        next(error);
    }
}

export const getTrips = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const trips = await handleGetTrips();
        res.status(200).json({
            message : "Trips fetched successfully",
            data : trips
        })
    } catch (error) {
        next(error);
    }
}

export const getTrip = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const trip = await handleGetTrip(req.params.id);
        res.status(200).json({
            message : "Trip fetched successfully",
            data : trip
        })
    } catch (error) {
        next(error);
    }
}



export const deleteTrip = async (req : Request, res : Response, next : NextFunction) => {
    try {
        await handleDeleteTrip(req.params.id);
        res.status(200).json({
            message : "Trip deleted successfully",
        })
    } catch (error) {
        next(error);
    }
}


export const addToFavorites = async (req : AuthenticatedRequest, res : Response, next : NextFunction) => {
    try {
        await handleAddToFavorites({
            id : req.user?.id || "",
            tripId : req.params.id
        });
        res.status(200).json({
            message : "Trip added to favorites successfully",
        })
        

    } catch (error) {
        next(error);
    }
}

export const removeFromFavorites = async (req : AuthenticatedRequest, res : Response, next : NextFunction) => {
    try {
        await handleRemoveFromFavorites({
            id : req.user?.id || "",
            tripId : req.params.id
        });
        res.status(200).json({
            message : "Trip removed from favorites successfully",
        })
    } catch (error) {
        next(error);
    }
}
