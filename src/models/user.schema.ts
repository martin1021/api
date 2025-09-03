import { z } from 'zod';
import { Role } from '@prisma/client';

// Base schema for user data
export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().nullable(),
  role: z.nativeEnum(Role).default(Role.USER),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Schema for creating a new user
export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  name: z.string().optional(),
  role: z.nativeEnum(Role).optional(),
});

// Schema for updating a user
export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(8).max(100).optional(),
  name: z.string().optional(),
  role: z.nativeEnum(Role).optional(),
});

// Schema for user login
export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Types derived from schemas
export type User = z.infer<typeof userSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;