const WebSocket = require('ws');

const serverUrl = 'ws://localhost:3000'; // Replace with your WebSocket server URL

const socket = new WebSocket(serverUrl);

socket.addEventListener('open', (event) => {
  // Code that will run when the connection is opened
  console.log('WebSocket connection established:', event);

  // Send an initial message to update cosmetics
  socket.send(JSON.stringify({ type: 'UPDATE_COSMETICS', data: { username: 'testUsername', equippedCosmetics: ['cosmeticOne', 'cosmeticTwo'] } }));

  // Send a message to request cosmetics data
  socket.send(JSON.stringify({ type: 'GET_COSMETICS', data: { username: 'testUsername' } }));
});

socket.addEventListener('message', (event) => {
  // Code that will run when a message is received from the server
  console.log('Raw Message from server:', event.data);

  try {
    // Attempt to parse the received message as JSON
    const message = JSON.parse(event.data);

    if (message.type) {
      // Check the message type and handle accordingly
      switch (message.type) {
        case 'GET_COSMETICS_RESPONSE':
          if (message.status === 200) {
            console.log('Received GET_COSMETICS response:', message.body);
          } else {
            console.error('Received an error response:', message.status, message.body);
          }
          break;
        default:
          console.log('Received unknown message type:', message.type);
      }
    }
  } catch (error) {
    console.error('Error parsing JSON message:', error);
  }
});

socket.addEventListener('close', (event) => {
  // Code that will run when the connection is closed
  if (event.wasClean) {
    console.log(`Connection closed cleanly, code=${event.code}, reason=${event.reason}`);
  } else {
    console.error('Connection abruptly closed');
  }
});

socket.addEventListener('error', (error) => {
  // Code that will run when an error occurs
  console.error('WebSocket error:', error);
});
