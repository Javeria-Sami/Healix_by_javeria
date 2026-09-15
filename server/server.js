import app from './app.js';
import { config } from './config/environment.js';

const server = app.listen(config.port, () => {
  console.log(`[Healix Server] Running in ${config.env} mode on http://localhost:${config.port}`);
  console.log(`[Healix Server] Health check available at http://localhost:${config.port}/api/health`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('[Healix Server] SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('[Healix Server] Process terminated.');
  });
});
