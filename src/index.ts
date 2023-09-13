import * as http from 'http';
import * as WebSocket from 'ws';
import Logger from '@/utils/Logger';
import { initializeWebSocketListeners } from '@/websocket/listeners'; 

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket Server\n');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  Logger.info('A NEW CONNECTION HAS BEEN ESTABLISHED');
  initializeWebSocketListeners(ws); // Initialize WebSocket listeners in a separate module
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  Logger.info(`WebSocket has been initialized on port ${PORT}`);
});
