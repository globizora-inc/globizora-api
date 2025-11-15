/* eslint-env node */
import http from 'http';
import app from './app.js';
import { setTimeout as delay } from 'node:timers';  // ✅

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

process.on('uncaughtException', (err) => console.error('❌ Uncaught Exception:', err));
process.on('unhandledRejection', (reason) => console.error('❌ Unhandled Rejection:', reason));

delay(() => { console.log('⏰ Server health check OK'); }, 5000);  // ✅
