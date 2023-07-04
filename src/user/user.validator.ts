import Joi,{Schema} from "joi";
import { ILogin, IUser } from "../types/user.types";


export const userSchema: Schema = Joi.object<IUser>({
    firstName: Joi.string()
        .required()
        .trim()
        .min(2)
        .max(50)
        .messages({
            'string.base': `First name should be a type of 'text'`,
            'string.empty': `First name cannot be an empty field`,
            'string.min': `First name should have a minimum length of {#limit}`,
            'string.max': `First name should have a maximum length of {#limit}`,
            'any.required': `First name is a required field`
        }),
    lastName: Joi.string()
        .required()
        .trim()
        .min(2)
        .max(50)
        .messages({
            'string.base': `Last name should be a type of 'text'`,
            'string.empty': `Last name cannot be an empty field`,
            'string.min': `Last name should have a minimum length of {#limit}`,
            'string.max': `Last name should have a maximum length of {#limit}`,
            'any.required': `Last name is a required field`
        }),
    email: Joi.string().email().required().trim().lowercase().messages({
        'string.base': `Email should be a type of 'text'`,
        'string.empty': `Email cannot be an empty field`,
        'string.email': `Email format is invalid`,
        'any.required': `Email is a required field`
    }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required().messages({
        'string.base': `Password should be a type of 'text'`,   
        'string.empty': `Password cannot be an empty field`,
        'string.pattern.base': `Password should contain at least 8 characters and include at least one uppercase letter, one lowercase letter, and one number`,

        'any.required': `Password is a required field`
    }),
    role: Joi.string().valid('user', 'admin').default('user').messages({
        'string.base': `Role should be a type of 'text'`,   
        'string.empty': `Role cannot be an empty field`,
        'any.only': `Role should be either 'user' or 'admin'`,
    }),
    address: Joi.object({
        country: Joi.string()
            .required()
            .trim()
            .min(2)
            .max(50)
            .messages({
                'string.base': `Country should be a type of 'text'`,    
                'string.empty': `Country cannot be an empty field`,
                'string.min': `Country should have a minimum length of {#limit}`,
                'string.max': `Country should have a maximum length of {#limit}`,
                'any.required': `Country is a required field`
            }),
        city: Joi.string()
            .required()
            .trim()
            .min(2)
            .max(50)
            .messages({
                'string.base': `City should be a type of 'text'`,
                'string.empty': `City cannot be an empty field`,
                'string.min': `City should have a minimum length of {#limit}`,
                'string.max': `City should have a maximum length of {#limit}`,
                'any.required': `City is a required field`
            }),
        street: Joi.string().trim().messages({
            'string.base': `Street should be a type of 'text'`,
            'string.empty': `Street cannot be an empty field`,
        }),
        zip: Joi.string().trim().messages({
            'string.base': `Zip should be a type of 'text'`,
            'string.empty': `Zip cannot be an empty field`
        })
    }),

    })


export const loginSchema = Joi.object<ILogin>({
    email: Joi.string().email().required().trim().lowercase().messages({
        'string.base': `Email should be a type of 'text'`,
        'string.empty': `Email cannot be an empty field`,
        'string.email': `Email format is invalid`,
        'any.required': `Email is a required field`
    }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,50}$')).required().trim().messages({
        'string.base': `Password should be a type of 'text'`,
        'string.empty': `Password cannot be an empty field`,
        'string.pattern.base': `Password should contain at least 8 characters`,
        'any.required': `Password is a required field`
    })
})


    
    
    
export const updateUserSchema = Joi.object({
    firstName: Joi.string()
      .optional()
      .trim()
      .min(2)
      .max(50)
      .messages({
        'string.base': `First name should be a type of 'text'`,
        'string.empty': `First name cannot be an empty field`,
        'string.min': `First name should have a minimum length of {#limit}`,
        'string.max': `First name should have a maximum length of {#limit}`,
      }),
    lastName: Joi.string()
      .optional()
      .trim()
      .min(2)
      .max(50)
      .messages({
        'string.base': `Last name should be a type of 'text'`,
        'string.empty': `Last name cannot be an empty field`,
        'string.min': `Last name should have a minimum length of {#limit}`,
        'string.max': `Last name should have a maximum length of {#limit}`,
      }),
    email: Joi.string()
      .email()
      .optional()
      .trim()
      .lowercase()
      .messages({
        'string.base': `Email should be a type of 'text'`,
        'string.empty': `Email cannot be an empty field`,
        'string.email': `Email format is invalid`,
      }),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{8,50}$'))
      .optional()
      .trim()
      .messages({
        'string.base': `Password should be a type of 'text'`,
        'string.empty': `Password cannot be an empty field`,
        'string.pattern.base': `Password should contain at least 8 characters`,
      }),
    role: Joi.string()
      .valid('user', 'admin')
      .optional()
      .messages({
        'string.base': `Role should be a type of 'text'`,
        'string.empty': `Role cannot be an empty field`,
        'any.only': `Role should be either 'user' or 'admin'`,
      }),
    address: Joi.object({
      country: Joi.string()
        .optional()
        .trim()
        .min(2)
        .max(50)
        .messages({
          'string.base': `Country should be a type of 'text'`,
          'string.empty': `Country cannot be an empty field`,
          'string.min': `Country should have a minimum length of {#limit}`,
          'string.max': `Country should have a maximum length of {#limit}`,
        }),
      city: Joi.string()
        .optional()
        .trim()
        .min(2)
        .max(50)
        .messages({
          'string.base': `City should be a type of 'text'`,
          'string.empty': `City cannot be an empty field`,
          'string.min': `City should have a minimum length of {#limit}`,
          'string.max': `City should have a maximum length of {#limit}`,
        }),
      street: Joi.string()
        .optional()
        .trim()
        .messages({
          'string.base': `Street should be a type of 'text'`,
          'string.empty': `Street cannot be an empty field`,
        }),
      zip: Joi.string()
        .optional()
        .trim()
        .messages({
          'string.base': `Zip should be a type of 'text'`,
          'string.empty': `Zip cannot be an empty field`,
        }),
    }),
  });