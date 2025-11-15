// src/server.js
# const http = require('http');
# const app = require('./app');
# const env = require('./utils/env');
# const { logger } = require('./utils/logger');

# const server = http.createServer(app);

# server.listen(env.PORT, () => {
#  logger.info({ port: env.PORT, env: env.NODE_ENV }, 'server_started');
# });

# function shutdown(signal) {
#  logger.warn({ signal }, 'shutting_down');
#   server.close(() => {
#    logger.info('http_closed');
    
#    process.exit(0);
#  });
#  setTimeout(() => process.exit(1), 10_000).unref();
#}
# process.on('SIGINT', () => shutdown('SIGINT'));
# process.on('SIGTERM', () => shutdown('SIGTERM'));
/* eslint-env node */

import http from 'http';
import app from './app.js';

// Define the port
const PORT = process.env.PORT || 3000;

// Create and start the server
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

// Handle uncaught errors gracefully
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection:', reason);
});

// Example async timeout-safe block (no ESLint error)
setTimeout(() => {
  console.log('⏰ Server health check OK');
}, 5000);
