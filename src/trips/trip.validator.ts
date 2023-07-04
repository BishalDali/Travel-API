import Joi, { Schema } from 'joi';
import { ITrip } from '../types/trip.types';

export const tripSchema : Schema = Joi.object<ITrip>({
  title: Joi.string()
    .required()
    .trim()
    .min(2)
    .max(50)
    .messages({
      'string.base': `Title should be a type of 'text'`,
      'string.empty': `Title cannot be an empty field`,
      'string.min': `Title should have a minimum length of {#limit}`,
      'string.max': `Title should have a maximum length of {#limit}`,
      'any.required': `Title is a required field`
    }),
  description: Joi.string()
    .required()
    .trim()
    .min(2)
    .max(500)
    .messages({
      'string.base': `Description should be a type of 'text'`,
      'string.empty': `Description cannot be an empty field`,
      'string.min': `Description should have a minimum length of {#limit}`,
      'string.max': `Description should have a maximum length of {#limit}`,
      'any.required': `Description is a required field`
    }),
  location: Joi.string()
    .required()
    .trim()
    .min(2)
    .max(50)
    .messages({
      'string.base': `Location should be a type of 'text'`,
      'string.empty': `Location cannot be an empty field`,
      'string.min': `Location should have a minimum length of {#limit}`,
      'string.max': `Location should have a maximum length of {#limit}`,
      'any.required': `Location is a required field`
    }),
  startDate: Joi.date()
    .required()
    .messages({
      'date.base': `Start date should be a valid date`,
      'any.required': `Start date is a required field`
    }),
  endDate: Joi.date()
    .required()
    .messages({
      'date.base': `End date should be a valid date`,
      'any.required': `End date is a required field`
    }),
  budget: Joi.number()
    .required()
    .min(0)
    .messages({
      'number.base': `Budget should be a valid number`,
      'number.min': `Budget must be a positive number`,
      'any.required': `Budget is a required field`
    }),
  photos: Joi.array()
    .items(Joi.string()),
  tags: Joi.array()
    .items(Joi.string())
    .messages({
      'array.base': `Tags should be an array`,
    }),
  accomodation: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().trim(),
        address: Joi.string().trim(),
        checkIn: Joi.date(),
        checkOut: Joi.date(),
      })
    )
    .messages({
      'array.base': `Accomodation should be an array`,
    }),
  activities: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().trim(),
        description: Joi.string().trim(),
        location: Joi.string().trim(),
      })
    )
    .messages({
      'array.base': `Activities should be an array`,
    }),
  transportation: Joi.array()
    .items(
      Joi.object({
        name: Joi.string()
          .required()
          .trim()
          .min(2)
          .max(50),
        description: Joi.string()
          .required()
          .trim()
          .min(2)
          .max(500),
      })
    )
    .messages({
      'array.base': `Transportation should be an array`,
    }),
});
