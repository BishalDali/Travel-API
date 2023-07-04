
import { ITrip } from "../types/trip.types";
import { CustomError } from "../utils/error.utils";
import Trip from "./trip.entities";
import { User } from "../user/user.entities";



export const handleCreateTrip = async (trip: ITrip) => {
    try {
        const tripExists = await Trip.findOne({
            title: trip.title,
            startDate: trip.startDate,
            endDate: trip.endDate
        });
        if (tripExists) {
            throw new CustomError("Trip already exists", 400);
        }
        const newTrip = new Trip(trip);
        return await newTrip.save();
    } catch (error) {
        throw error;
    }
}

export const handleGetTrips = async () => {
    try {
        return await Trip.find({}, { _id:1, title: 1, photos: 1, description: 1 });
    } catch (error) {
        throw error;
    }
}

export const handleGetTrip = async (id: string) => {
    try {
        const trip = await Trip.findById(id);
        if (!trip) {
            throw new CustomError("Trip does not exist", 404);
        }
        return trip;
    } catch (error) {
        throw error;
    }
}


export const handleDeleteTrip = async (id: string) => {
    try {
        const trip = await Trip.findByIdAndDelete(id);
        if (!trip) {
            throw new CustomError("Trip does not exist", 404);
        }
        return trip;
    } catch (error) {
        throw error;
    }
}

export const getTripFavourites = async () => {
    try {
        return await Trip.find({}, { _id:1,  totalFavorites: 1 });
    } catch (error) {
        throw error;
    }
}

export const handleAddToFavorites = async ({id, tripId} : {id : string, tripId : string}) => {
    try {
        await Trip.findByIdAndUpdate(tripId, {
            $inc: { totalFavorites: 1 },
            $addToSet: { favoritesBy: id }
          });
          
        await User.findByIdAndUpdate(id, { $push: { favouriteTrips: tripId } });


    } catch (error) {
        throw error
        
    }
}

export const handleRemoveFromFavorites = async ({ id, tripId }: { id: string, tripId: string }) => {
    try {
        
      await Trip.findByIdAndUpdate(tripId, { 
        $inc: { totalFavorites: -1 },
        $pull: { favoritesBy: id }
      });
      await User.findByIdAndUpdate(id, { $pull: { favouriteTrips: tripId } });
    } catch (error) {
      throw error;
    }
  };
  
