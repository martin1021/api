import { Router } from 'express';
import { userController } from '../controllers';
import { authenticate, authorize, validate } from '../middlewares';
import { createUserSchema, updateUserSchema } from '../models/user.schema';

// Create router
const router = Router();

// Define routes
router
  .route('/')
  .get(authenticate, authorize(['ADMIN']), userController.getAllUsers)
  .post(
    validate(createUserSchema),
    authenticate,
    authorize(['ADMIN']),
    userController.createUser
  );

router
  .route('/me')
  .get(authenticate, userController.getMe)
  .patch(
    authenticate,
    validate(updateUserSchema),
    userController.updateMe
  );

router
  .route('/:id')
  .get(authenticate, userController.getUserById)
  .patch(
    authenticate,
    validate(updateUserSchema),
    userController.updateUser
  )
  .delete(
    authenticate,
    authorize(['ADMIN']),
    userController.deleteUser
  );

export const userRouter = router;