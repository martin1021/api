import { userService } from './user.service';
import { generateToken, verifyToken } from '../utils/jwt';
import { unauthorized } from '../utils/errors';
import { LoginUserInput } from '../models/user.schema';

/**
 * Authentication service class for handling authentication-related business logic
 */
export class AuthService {
  /**
   * Login user and generate JWT token
   * @param data - Login data
   * @returns Object containing user and token
   */
  async login(data: LoginUserInput): Promise<{ user: any; token: string }> {
    // Login user
    const user = await userService.loginUser(data);

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return { user, token };
  }

  /**
   * Verify JWT token and get user
   * @param token - JWT token
   * @returns User
   */
  async verifyToken(token: string): Promise<any> {
    // Verify token
    const payload = verifyToken(token);

    if (!payload) {
      throw unauthorized('Invalid token');
    }

    // Get user
    const user = await userService.getUserById(payload.userId);

    return user;
  }
}

// Export singleton instance
export const authService = new AuthService();