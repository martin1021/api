import express, { Express } from 'express';
import cors from 'cors';
import { apiRouter } from './routes';
import { errorMiddleware, notFoundMiddleware } from './middlewares';
import { env } from './config/env';
import { connectToDatabase } from './config/database';

/**
 * Create Express application
 */
export async function createApp(): Promise<Express> {
  // Create Express app
  const app = express();

  // Connect to database
  await connectToDatabase();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API routes
  app.use('/api', apiRouter);

  // Health check route
  app.get('/health', (_req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'Server is running',
      environment: env.NODE_ENV,
      timestamp: new Date().toISOString(),
    });
  });

  // Handle undefined routes
  app.use(notFoundMiddleware);

  // Error handling middleware
  app.use(errorMiddleware);

  return app;
}