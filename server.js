const http = require('node:http');
const WebSocket = require('ws');

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('hello world');
});

let counter = 0;
const printAndClearStat = () => {
  console.log('new messages: ', counter);
  counter = 0;
};

setInterval(printAndClearStat, 1000);

server.listen(8000, () => {
  console.log('Listen port 8000');
});

const ws = new WebSocket.Server({ server });

ws.on('connection', (connection, req) => {
  const ip = req.socket.remoteAddress;
  connection.on('message', (message) => {
    // console.log(message);
    counter++;
    // connection.send('pong');
  });
  connection.on('close', () => {
    console.log(`Disconnected ${ip}`);
  });
});
