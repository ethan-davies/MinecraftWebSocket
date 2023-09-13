import Logger from '../utils/Logger';
import { validMessageTypes } from './enums';
import WebSocketManager from '../utils/apiManager';
import { connectedUsers } from '../utils/apiManager';

interface messageData {
    type: string,
    data: string,
    username?: string,
    equippedCosmetics?: string[]
}

export let connectedUsers1: {}[] = [];

export default class MessageHandler {
  private ws: WebSocket;

  constructor(ws: WebSocket) {
    this.ws = ws;
  }

  private isTypeValid(type: string): boolean {
      return Object.values(validMessageTypes).includes(type)
  }

  private isMessageData(data: any): data is messageData {
  return (
    typeof data === 'object' &&
    'username' in data &&
    'equippedCosmetics' in data
  );
}


  private async handleMessage(message: messageData) {
    let sendMessage: string

    if(message.type === undefined || message.data === undefined) {
        Logger.error('MESSAGE DOESNT MATCH REQUIRED FORMAT: ' + JSON.stringify(message));
        sendMessage = (JSON.stringify({status: 422, body: 'INVALID MESSAGE'}))
        this.sendMessage(sendMessage);
        return;
    }

    const jsonObject = message.data
    switch (message.type.toUpperCase()) {
        default: 
            sendMessage = (JSON.stringify({status: 200, body: 'RECEIVED UNKNOWN MESSAGE'}))
        case 'UPDATE_COSMETICS':
            if (this.isMessageData(jsonObject)) {
              // You can now safely access the properties
              const username = jsonObject.username;
              const equippedCosmetics = jsonObject.equippedCosmetics;

              await WebSocketManager.updatePlayerCosmetics(username, equippedCosmetics)
              Logger.debug('Username: ' + username + ' Cosmetics: ' + equippedCosmetics)
              sendMessage = (JSON.stringify({status: 200, body: 'RECEIVED, UPDATED COSMETICS'}))


            } else {
              sendMessage = (JSON.stringify({status: 422, body: 'INVALID EQUIPPED COSMETICS OR USERNAME'}))
              console.error('Invalid message data format');
            }
            break;

        case 'TEST':
            sendMessage = (JSON.stringify({status: 200, body: 'RECEIVED TEST MESSAGE'}))
            break;
        case 'GET_COSMETICS':
            if(this.isMessageData(jsonObject)) {
                const username = jsonObject.username;
                const cosmetics = await WebSocketManager.getPlayersOwnedCosmetics(username)
                sendMessage = (JSON.stringify({status: 200, body: cosmetics}))
            }
            break;
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
