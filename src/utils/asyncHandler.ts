import { Request, Response, NextFunction } from 'express';

/**
 * Wrapper for async route handlers to catch errors and pass them to the error middleware
 * @param fn - The async route handler function
 * @returns A function that catches errors and passes them to the next middleware
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};