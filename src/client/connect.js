const WebSocket = require('ws');

const serverUrl = 'ws://localhost:3000'; // Replace with your WebSocket server URL

const socket = new WebSocket(serverUrl);

socket.addEventListener('open', (event) => {
  // Code that will run when the connection is opened
  console.log('WebSocket connection established:', event);
  socket.send(JSON.stringify({type: 'TEST', data: 'In the "TEST" case this data section is usless, except is required'}));
});

socket.addEventListener('message', (event) => {
  // Code that will run when a message is received from the server
  console.log('Message from server:', event.data);
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
