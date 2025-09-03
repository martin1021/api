import { Request, Response, NextFunction } from 'express';
import { authService } from '../services';
import { unauthorized, forbidden } from '../utils/errors';

// Extend Express Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

/**
 * Authentication middleware to protect routes
 */
export function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    next(unauthorized('Authentication required'));
    return;
  }
  
  // Extract token
  const token = authHeader.split(' ')[1];
  
  if (!token) {
    next(unauthorized('Authentication required'));
    return;
  }
  
  // Verify token
  authService
    .verifyToken(token)
    .then(user => {
      // Attach user to request
      req.user = user;
      next();
    })
    .catch(_error => {
      next(unauthorized('Invalid or expired token'));
    });
}

/**
 * Authorization middleware to restrict access based on user role
 * @param roles - Allowed roles
 */
export function authorize(roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(unauthorized('Authentication required'));
      return;
    }
    
    if (!roles.includes(req.user.role)) {
      next(forbidden('You do not have permission to access this resource'));
      return;
    }
    
    next();
  };
}