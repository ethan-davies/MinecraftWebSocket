import WebSocket from 'ws';
import Logger from '@/utils/Logger';
import MessageHandler from './handleMessage';

export function initializeWebSocketListeners(ws: WebSocket) {
  const messageHandler = new MessageHandler(ws);

  ws.on('message', (message) => {
    messageHandler.receivedMessage(message.toString());
    // Message handler will respond accordingly
  });

  ws.on('close', () => {
    Logger.info('A CONNECTION HAS BEEN CLOSED');
  });
}
