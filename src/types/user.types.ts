import { Document } from 'mongoose';


export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    address: {
        country: string;
        city: string;
        street: string;
        zip: string;
    }
    favouriteTrips: string[];
    travelInterests: string[];
    travelHistory: string[];
    createdAt: Date;
    updatedAt: Date;  
}

export interface ILogin {
    email: string;
    password: string;
}

export interface IUserResponse {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    address: {
        country: string;
        city: string;
        street: string;
        zip: string;
    }
}