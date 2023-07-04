import {Schema, model} from 'mongoose';
import { IUser } from '../types/user.types';

const userSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        minlength: [2, 'First name must be at least 2 characters long'],
        maxlength: [50, 'First name must be less than 50 characters long'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        minlength: [2, 'Last name must be at least 2 characters long'],
        maxlength: [50, 'Last name must be less than 50 characters long'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true,
        lowercase: true,
        minlength: [5, 'Email must be at least 5 characters long'],
        maxlength: [50, 'Email must be less than 50 characters long'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
    },
    address: {
        country: {
            type: String,
            required: [true, 'Country is required'],
            trim: true,
            minlength: [2, 'Country must be at least 2 characters long'],
            maxlength: [50, 'Country must be less than 50 characters long'],
        },
        city: {
            type: String,
            required: [true, 'City is required'],
            trim: true,
            minlength: [2, 'City must be at least 2 characters long'],
            maxlength: [50, 'City must be less than 50 characters long'],
        },
        street: {
            type: String,
            trim: true
        },
        zip: {
            type: String,
            trim: true
        }
    },
    favouriteTrips: [{
        type: Schema.Types.ObjectId,
        ref: 'Trip'
    }],
    travelInterests: [{
        type: Schema.Types.ObjectId,
        ref: 'Interest'
    }],
    travelHistory: [{
        type: Schema.Types.ObjectId,
        ref: 'Trip'
    }]
}, {
    timestamps: true
});

export const User = model<IUser>('User', userSchema);

