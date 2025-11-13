// src/server.js
const http = require('http');
const app = require('./app');
const env = require('./utils/env');
const { logger } = require('./utils/logger');

const server = http.createServer(app);

server.listen(env.PORT, () => {
  logger.info({ port: env.PORT, env: env.NODE_ENV }, 'server_started');
});

function shutdown(signal) {
  logger.warn({ signal }, 'shutting_down');
  server.close(() => {
    logger.info('http_closed');
    // TODO: 关闭 Mongo/队列连接等
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10_000).unref();
}
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
