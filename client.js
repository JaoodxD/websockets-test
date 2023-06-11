const WebSocket = require('ws');
const fs = require('node:fs');

const listing = fs.readFileSync('./client.js');

const client = new WebSocket('ws://localhost:9001');

client.on('error', console.error);
client.on('open', () => {
  for (let i = 0; i < 1_000_000; i++) {
    // client.send('something');
    client.send('hello')
  }
});

client.on('message', (data) => {
  console.log('received: %s', data);
});
