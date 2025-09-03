import { Router } from 'express';
import { authController } from '../controllers';
import { authenticate, validate } from '../middlewares';
import { createUserSchema, loginUserSchema } from '../models/user.schema';

// Create router
const router = Router();

// Define routes
router.post(
  '/register',
  validate(createUserSchema),
  authController.register
);

router.post(
  '/login',
  validate(loginUserSchema),
  authController.login
);

router.get(
  '/me',
  authenticate,
  authController.getMe
);

export const authRouter = router;