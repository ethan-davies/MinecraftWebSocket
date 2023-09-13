const WebSocket = require('ws');

const serverUrl = 'ws://localhost:3000'; // Replace with your WebSocket server URL

const socket = new WebSocket(serverUrl);

socket.addEventListener('open', (event) => {
  console.log('WebSocket connection established:', event);

  socket.send(JSON.stringify({type: 'TEST', data: 'wagwan'}));
});

socket.addEventListener('message', (event) => {
  console.log('Message from server:', event.data);
});

socket.addEventListener('close', (event) => {
  if (event.wasClean) {
    console.log(`Connection closed cleanly, code=${event.code}, reason=${event.reason}`);
  } else {
    console.error('Connection abruptly closed');
  }
});

socket.addEventListener('error', (error) => {
  console.error('WebSocket error:', error);
});
