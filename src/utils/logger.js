// src/utils/logger.js
const pino = require('pino');
const pinoHttp = require('pino-http');
const { randomUUID } = require('uuid');
const env = require('./env');

const logger = pino({ level: env.LOG_LEVEL });

const httpLogger = pinoHttp({
  logger,
  genReqId: (req) => req.headers['x-request-id'] || randomUUID(),
  redact: {
    paths: ['req.headers.authorization', 'req.body.password', 'res.headers["set-cookie"]'],
    remove: true
  }
});

module.exports = { logger, httpLogger };
