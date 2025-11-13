// src/middleware/security.js CSP + CORS
const helmet = require('helmet');
const cors = require('cors');
const hpp = require('hpp');
const xss = require('xss-clean');
const env = require('../utils/env');

const allowOrigins = env.ALLOW_ORIGINS.split(',').map(s => s.trim());

const cspDirectives = {
  defaultSrc: ["'self'"],
  scriptSrc:  ["'self'", "'unsafe-inline'", "https://unpkg.com", "https://cdn.jsdelivr.net"],
  styleSrc:   ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
  fontSrc:    ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
  imgSrc:     ["'self'", "data:"],
  connectSrc: ["'self'"],
  objectSrc:  ["'none'"],
  baseUri:    ["'self'"],
  frameAncestors: ["'none'"],
};

function security(app) {
  app.use(helmet({
    contentSecurityPolicy: { directives: cspDirectives },
    crossOriginEmbedderPolicy: false, // 兼容 Swagger UI
  }));
  app.use(hpp());
  app.use(xss());
  app.use(cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true); // 同源/服务器调用
      return cb(null, allowOrigins.includes(origin));
    },
    credentials: false
  }));
  // HSTS 由前置代理/Cloudflare 负责也可以，这里再加一层
  app.use((req, res, next) => {
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
  });
}

module.exports = security;
