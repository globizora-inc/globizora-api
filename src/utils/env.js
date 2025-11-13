// src/utils/env.js
const { cleanEnv, str, num, bool } = require('envalid');

const env = cleanEnv(process.env, {
  NODE_ENV:         str({ choices: ['development','test','production'], default: 'development' }),
  PORT:             num({ default: 3000 }),
  APP_URL:          str({ default: 'http://localhost:3000' }),
  MONGO_URL:        str(),
  JWT_SECRET:       str(),
  // Stripe
  STRIPE_SECRET_KEY:     str({ desc: 'sk_live_... or sk_test_...' }),
  STRIPE_WEBHOOK_SECRET: str({ desc: 'whsec_...' }),
  // CORS
  ALLOW_ORIGINS:    str({ default: 'http://localhost:3000' }),
  // Logs
  LOG_LEVEL:        str({ default: 'info' }),
  // 限流与速率（可调）
  RATE_LIMIT_IP_RPS:   num({ default: 10 }),
  RATE_LIMIT_KEY_RPS:  num({ default: 5 }),
  // 开关
  ENABLE_SWAGGER:   bool({ default: true }),
});

module.exports = env;
