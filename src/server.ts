import { createApp } from './app';
import { env } from './config/env';

/**
 * Start server
 */
async function startServer() {
  try {
    // Create Express app
    const app = await createApp();
    
    // Get port
    const port = env.PORT;
    
    // Start server
    app.listen(port, () => {
      console.log(`✅ Server running on port ${port} in ${env.NODE_ENV} mode`);
      console.log(`🔗 http://localhost:${port}/api`);
    });
  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1);
  }
}

// Start server
startServer();