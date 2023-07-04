import { Request, Response, NextFunction } from "express";

export interface ErrorResponse {
  statusCode: number;
  message: string;
  errors?: any;
}

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(error); // Log the error for debugging purposes

  let statusCode = 500;
  let message = "Internal Server Error";
  let errors: any;

  // Check if the error is a known error type
  if (error instanceof CustomError) {
    statusCode = error.statusCode;
    message = error.message;
    errors = error.errors;
  }

  // Handle Joi validation errors
  if (error.name === "ValidationError") {
    statusCode = 400;
    message = "Validation Error";
    errors = extractValidationErrors(error);
  }

  const response: ErrorResponse = {
    statusCode,
    message,
  };

  if (errors) {
    response.errors = errors;
  }

  res.status(statusCode).json(response);
};

// Custom error class
export class CustomError extends Error {
  statusCode: number;
  errors?: any;

  constructor(message: string, statusCode: number, errors?: any) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

// Extract validation errors from Joi ValidationError
export const extractValidationErrors = (error: Error): any => {
  const validationErrors: any = {};

  if (error instanceof Error && error.hasOwnProperty("details")) {
    const { details } = error as any;

    details.forEach((err: any) => {
      validationErrors[err.path[0]] = err.message;
    });
  }

  return validationErrors;
};
