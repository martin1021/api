import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { badRequest } from '../utils/errors';

/**
 * Validation middleware to validate request data using Zod schemas
 * @param schema - Zod schema to validate against
 * @param source - Request property to validate (body, query, params)
 */
export function validate(
  schema: ZodSchema,
  source: 'body' | 'query' | 'params' = 'body'
) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      // Validate request data against schema
      const data = schema.parse(req[source]);
      
      // Replace request data with validated data
      req[source] = data;
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Format Zod error messages
        const formattedErrors = error.format();
        
        next(badRequest(JSON.stringify(formattedErrors)));
      } else {
        next(error);
      }
    }
  };
}