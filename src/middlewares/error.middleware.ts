import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/errors';
import { env } from '../config/env';

/**
 * Error handling middleware
 */
export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error(`Error: ${err.message}`);
  
  // If the error is an ApiError, use its status code and message
  if (err instanceof ApiError) {
    const statusCode = err.statusCode;
    const message = err.message;
    const isOperational = err.isOperational;
    
    // Only send stack trace in development mode and for non-operational errors
    const stack = env.NODE_ENV === 'development' || !isOperational ? err.stack : undefined;
    
    res.status(statusCode).json({
      status: 'error',
      message,
      ...(stack && { stack }),
    });
    return;
  }
  
  // For other errors, return a generic 500 error
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}

/**
 * Not found middleware for handling undefined routes
 */
export function notFoundMiddleware(
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  res.status(404).json({
    status: 'error',
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
}