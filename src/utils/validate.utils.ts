import { Request, Response, NextFunction } from "express";
import { extractValidationErrors, CustomError } from "./error.utils";
import { Schema } from "joi";

export const validateSchema = (schema: Schema) => {
    console.log("hello World");
    return (req: Request, res: Response, next: NextFunction): void => {
      console.log("hello World");
      const { error } = schema.validate(req.body);
      if (error) {
        const validationErrors = extractValidationErrors(error);
        const errorMessage = "Validation error";
        const statusCode = 400;
        throw new CustomError(errorMessage, statusCode, validationErrors);
      }
      console.log(error);
      next();
    };
  };