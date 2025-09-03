import { Request, Response, NextFunction } from 'express';
import { userService } from '../services';
import { asyncHandler } from '../utils';
import { CreateUserInput, UpdateUserInput } from '../models/user.schema';

/**
 * User controller class for handling user-related HTTP requests
 */
export class UserController {
  /**
   * Create a new user
   * @route POST /api/users
   * @access Public
   */
  createUser = asyncHandler(
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
   * Get all users
   * @route GET /api/users
   * @access Private/Admin
   */
  getAllUsers = asyncHandler(
    async (_req: Request, res: Response, _next: NextFunction) => {
      const users = await userService.getAllUsers();
      
      res.status(200).json({
        status: 'success',
        results: users.length,
        data: { users },
      });
    }
  );

  /**
   * Get user by ID
   * @route GET /api/users/:id
   * @access Private
   */
  getUserById = asyncHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      
      res.status(200).json({
        status: 'success',
        data: { user },
      });
    }
  );

  /**
   * Update user
   * @route PATCH /api/users/:id
   * @access Private
   */
  updateUser = asyncHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { id } = req.params;
      const userData: UpdateUserInput = req.body;
      const user = await userService.updateUser(id, userData);
      
      res.status(200).json({
        status: 'success',
        data: { user },
      });
    }
  );

  /**
   * Delete user
   * @route DELETE /api/users/:id
   * @access Private/Admin
   */
  deleteUser = asyncHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { id } = req.params;
      const user = await userService.deleteUser(id);
      
      res.status(200).json({
        status: 'success',
        data: { user },
      });
    }
  );

  /**
   * Get current user profile
   * @route GET /api/users/me
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

  /**
   * Update current user profile
   * @route PATCH /api/users/me
   * @access Private
   */
  updateMe = asyncHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const userData: UpdateUserInput = req.body;
      const user = await userService.updateUser(req.user.id, userData);
      
      res.status(200).json({
        status: 'success',
        data: { user },
      });
    }
  );
}

// Export singleton instance
export const userController = new UserController();