import { prisma } from '../models';
import { hashPassword, comparePassword } from '../utils/password';
import { conflict, notFound, unauthorized } from '../utils/errors';
import { User, CreateUserInput, UpdateUserInput, LoginUserInput } from '../models/user.schema';

// Import Role enum directly from Prisma schema
enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

/**
 * User service class for handling user-related business logic
 */
export class UserService {
  /**
   * Create a new user
   * @param data - User data
   * @returns The created user
   */
  async createUser(data: CreateUserInput): Promise<User> {
    // Check if user with email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw conflict(`User with email ${data.email} already exists`);
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: data.role || Role.USER,
      },
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }

  /**
   * Get user by ID
   * @param id - User ID
   * @returns The user
   */
  async getUserById(id: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw notFound(`User with ID ${id} not found`);
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }

  /**
   * Get all users
   * @returns List of users
   */
  async getAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();
    
    // Remove passwords from response
    return users.map((user: any) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword as User;
    });
  }

  /**
   * Update user
   * @param id - User ID
   * @param data - User data to update
   * @returns The updated user
   */
  async updateUser(id: string, data: UpdateUserInput): Promise<User> {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw notFound(`User with ID ${id} not found`);
    }

    // Check if email is being updated and if it's already in use
    if (data.email && data.email !== existingUser.email) {
      const emailInUse = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (emailInUse) {
        throw conflict(`Email ${data.email} is already in use`);
      }
    }

    // Hash password if it's being updated
    let hashedPassword: string | undefined;
    if (data.password) {
      hashedPassword = await hashPassword(data.password);
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: data.role,
      },
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword as User;
  }

  /**
   * Delete user
   * @param id - User ID
   * @returns The deleted user
   */
  async deleteUser(id: string): Promise<User> {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw notFound(`User with ID ${id} not found`);
    }

    // Delete user
    const deletedUser = await prisma.user.delete({
      where: { id },
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = deletedUser;
    return userWithoutPassword as User;
  }

  /**
   * Login user
   * @param data - Login data
   * @returns The user
   */
  async loginUser(data: LoginUserInput): Promise<User> {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      }
    })

    if (!user) {
      throw unauthorized('Invalid email or password');
    }

    // Compare passwords
    const isPasswordValid = await comparePassword(data.password, user.password);

    if (!isPasswordValid) {
      throw unauthorized('Invalid email or password');
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }
}

// Export singleton instance
export const userService = new UserService();