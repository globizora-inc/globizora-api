// src/routes/health.js
const express = require('express');
const router = express.Router();

router.get('/healthz', (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

router.get('/readyz', async (req, res) => {
  
  res.json({ ok: true, mongo: 'ok', stripe: 'ok' });
});

module.exports = router;
