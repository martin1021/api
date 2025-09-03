import { Request, Response, NextFunction } from 'express';
import { authService, userService } from '../services';
import { asyncHandler } from '../utils';
import { CreateUserInput, LoginUserInput } from '../models/user.schema';

/**
 * Auth controller class for handling authentication-related HTTP requests
 */
export class AuthController {
  /**
   * Register a new user
   * @route POST /api/auth/register
   * @access Public
   */
  register = asyncHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const userData: CreateUserInput = req.body;
      const user = await userService.createUser(userData);
      
      res.status(201).json({
        status: 'success',
        data: { user },
      });
    }
  );

  /**
   * Login user
   * @route POST /api/auth/login
   * @access Public
   */
  login = asyncHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const loginData: LoginUserInput = req.body;
      const { user, token } = await authService.login(loginData);
      
      res.status(200).json({
        status: 'success',
        data: { user, token },
      });
    }
  );

  /**
   * Get current user
   * @route GET /api/auth/me
   * @access Private
   */
  getMe = asyncHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const user = req.user;
      
      res.status(200).json({
        status: 'success',
        data: { user },
      });
    }
  );
}

// Export singleton instance
export const authController = new AuthController();