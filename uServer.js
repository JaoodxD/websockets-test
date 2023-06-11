const uWebSockets = require('uWebSockets.js');

const port = 9001;

let counter = 0;
const printAndClearStat = () => {
  console.log('new messages: ', counter);
  counter = 0;
};

setInterval(printAndClearStat, 1000);

const app = uWebSockets.App().ws('/*', {
  // compression: uWS.SHARED_COMPRESSOR,
  maxPayloadLength: 16 * 1024 * 1024,
  idleTimeout: 10,
  /* Handlers */
  open: (ws) => {
    console.log('A WebSocket connected!');
  },
  message: (ws, message, isBinary) => {
    counter++;
    /* Ok is false if backpressure was built up, wait for drain */
    // let ok = ws.send(message, isBinary);
  },
  drain: (ws) => {
    console.log('WebSocket backpressure: ' + ws.getBufferedAmount());
  },
  close: (ws, code, message) => {
    console.log('WebSocket closed');
  }
}).any('/*', (res, req) => {
  res.end('Nothing to see here!');
}).listen(port, (token) => {
  if (token) {
    console.log('Listening to port ' + port);
  } else {
    console.log('Failed to listen to port ' + port);
  }
});
