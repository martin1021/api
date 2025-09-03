/**
 * Custom API error class
 */
export class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    
    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Create a 400 Bad Request error
 */
export function badRequest(message = 'Bad Request'): ApiError {
  return new ApiError(400, message);
}

/**
 * Create a 401 Unauthorized error
 */
export function unauthorized(message = 'Unauthorized'): ApiError {
  return new ApiError(401, message);
}

/**
 * Create a 403 Forbidden error
 */
export function forbidden(message = 'Forbidden'): ApiError {
  return new ApiError(403, message);
}

/**
 * Create a 404 Not Found error
 */
export function notFound(message = 'Resource Not Found'): ApiError {
  return new ApiError(404, message);
}

/**
 * Create a 409 Conflict error
 */
export function conflict(message = 'Conflict'): ApiError {
  return new ApiError(409, message);
}

/**
 * Create a 500 Internal Server Error
 */
export function internalServerError(
  message = 'Internal Server Error'
): ApiError {
  return new ApiError(500, message, false);
}