// src/middleware/rate-limit.js  IP + API Key
const rateLimit = require('express-rate-limit');
const env = require('../utils/env');

// 简单内存限流（生产建议换 Redis 存储）
const byIP = rateLimit({
  windowMs: 1000,
  max: env.RATE_LIMIT_IP_RPS,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'rate_limited_ip' },
});

const byApiKey = rateLimit({
  windowMs: 1000,
  keyGenerator: (req) => (req.headers['x-api-key'] || 'anon'),
  max: env.RATE_LIMIT_KEY_RPS,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'rate_limited_key' },
});

module.exports = { byIP, byApiKey };
