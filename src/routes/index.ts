import { Router } from 'express';
import { userRouter } from './user.routes';
import { authRouter } from './auth.routes';

// Create router
const router = Router();

// Mount routes
router.use('/users', userRouter);
router.use('/auth', authRouter);

export const apiRouter = router;