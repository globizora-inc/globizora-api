/* eslint-env node */

const http = require('http');
const app = require('./app'); // 如果 app 是 ESM 默认导出，改为 require('./app').default

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, p) => {
  console.error('❌ Unhandled Rejection at:', p, 'reason:', reason);
});

// 心跳打印，确认进程健康
setTimeout(() => {
  console.log('⏰ Server health check OK');
}, 5000);
