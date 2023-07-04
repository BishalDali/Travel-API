import {Schema, model} from 'mongoose';
import { ITrip } from '../types/trip.types';

const tripSchema = new Schema<ITrip>({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [2, 'Title must be at least 2 characters long'],
        maxlength: [50, 'Title must be less than 50 characters long'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minlength: [2, 'Description must be at least 2 characters long'],
        maxlength: [500, 'Description must be less than 500 characters long'],
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true,
        minlength: [2, 'Location must be at least 2 characters long'],
        maxlength: [50, 'Location must be less than 50 characters long'],
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required'],
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required'],
    },
    budget: {
        type: Number,
        required: [true, 'Budget is required'],
        min: [0, 'Budget must be a positive number'],
    },
    photos: {
        type: [String],
        required: [true, 'Photos are required'],
        validate: {
            validator: function (photos: string[]) {
                return photos.length > 0;
            }
        }
    },
    tags: {
        type: [String]
    },
    accomodation: [
        {
            name: {
                type: String,
                trim: true,
               
            },
            address: {
                type: String,
                trim: true,
            },
            checkIn: {
                type: Date,
            },
            checkOut: {
                type: Date,
            },
        }
    ],
    activities: [
        {
            name: {
                type: String,
                trim: true,
            },
            description: {
                type: String,
                trim: true,
            },
            location: {
                type: String,
                trim: true,
            },
        }
    ],
    transportation: [
        {
            name: {
                type: String,
                required: [true, 'Transportation name is required'],
                trim: true,
                minlength: [2, 'Transportation name must be at least 2 characters long'],
                maxlength: [50, 'Transportation name must be less than 50 characters long'],
            },
            description: {  
                type: String,
                required: [true, 'Transportation description is required'],
                trim: true,
                minlength: [2, 'Transportation description must be at least 2 characters long'],
                maxlength: [500, 'Transportation description must be less than 500 characters long'],
            },
        }
    ],
    totalFavorites: {
        type: Number,
        default: 0,
    },
    favoritesBy: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ]

}, {
    timestamps: true,
});

export default model<ITrip>('Trip', tripSchema);