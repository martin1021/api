import jwt from 'jsonwebtoken';
import { env } from '../config/env';

/**
 * Interface for token payload
 */
export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

/**
 * Generate a JWT token
 * @param payload - The data to include in the token
 * @returns The generated JWT token
 */
export function generateToken(payload: TokenPayload): string {
  // @ts-ignore - Ignoring type errors for now
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
}

/**
 * Verify a JWT token
 * @param token - The token to verify
 * @returns The decoded token payload or null if invalid
 */
export function verifyToken(token: string): TokenPayload | null {
  try {
    // @ts-ignore - Ignoring type errors for now
    const decoded = jwt.verify(token, env.JWT_SECRET);
    return decoded as TokenPayload;
  } catch (error) {
    return null;
  }
}