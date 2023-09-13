import Logger from '@/utils/Logger';
import { validMessageTypes } from './enums';

interface messageData {
    type: string,
    data: string,
}

export default class MessageHandler {
  private ws: WebSocket;

  constructor(ws: WebSocket) {
    this.ws = ws;
  }

  private isTypeValid(type: string): boolean {
      return Object.values(validMessageTypes).includes(type)
  }

  private handleMessage(message: messageData) {
    let sendMessage: string

    if(message.type === undefined || message.data === undefined) {
        sendMessage = (JSON.stringify({status: 422, body: 'INVALID MESSAGE'}))
        this.sendMessage(sendMessage);
        return;
    }

    switch (message.type.toUpperCase()) {
        default: 
            sendMessage = (JSON.stringify({status: 200, body: 'RECEIVED UNKNOWN MESSAGE'}))
        case 'TEST':
            sendMessage = (JSON.stringify({status: 200, body: 'RECEIVED TEST MESSAGE'}))
        }

        if(!this.isTypeValid(message.type)) {
            sendMessage = (JSON.stringify({status: 422, body: 'INVALID MESSAGE TYPE'}))
        }

        this.sendMessage(sendMessage);
    }

  public receivedMessage(message: string) {
    Logger.info(`RECEIVED: ${message}`);
    try {
        const parsedMessage = JSON.parse(message)
    
        const typedMessage: messageData = {
          type: parsedMessage.type,
          data: parsedMessage.data
        }

        this.handleMessage(typedMessage);

    } catch (error) { // MESSAGE DOESNT MATCH REQUIRED FORMAT
        Logger.error(error);
    }
  }

  public sendMessage(message: string) {
    this.ws.send(message);
    Logger.info(`SENT: ${message}`);
  }
}
