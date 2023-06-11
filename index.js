'use strict';

const WebSocket = require('ws');
const json = require('./binance.json').symbols;

let counter = 0;
let total = 0;
let totalSeconds = 0;
let max = -Infinity;
let min = Infinity;

process.on('SIGINT', () => {
  const avg = total / totalSeconds;
  console.log({
    max,
    min,
    avg,
    total,
    totalSeconds
  });
  process.exit(0);

})

function printAndClearCounter() {
  console.log('Messages for last second: ', counter);
  if (counter > max) max = counter;
  if (counter < min && counter > 0) min = counter;
  totalSeconds++;
  total += counter;
  counter = 0;
}
setInterval(printAndClearCounter, 1000);


var stream_list = "";
let j = 0;
while (j < json.length) {
  var symbol = json[j].symbol;
  var count_exp = Math.pow(10, json[j].filters[1].stepSize);
  var tick_size = json[j].filters[0].tickSize;
  var price_exp = Math.pow(10, json[j].pricePrecision);
  var status = json[j].status;
  if (!symbol.includes('ETHUSDT') && !symbol.includes('BTCUSDT') && !symbol.includes('STMXUSDT') && !symbol.includes('XEMUSDT') && !symbol.includes('ETHBTC') && !symbol.includes('USDC') && !symbol.includes('BTCDOM') && !symbol.includes('BTCSTUSDT') && !symbol.includes('BUSD') && !symbol.includes('230630') && !status.includes('SETTLING')) {
    stream_list += symbol.toLowerCase() + '@bookTicker/';
  }
  j++;
}
stream_list = stream_list.slice(0, -1);

var client = new WebSocket('wss://fstream.binance.com/stream?streams=' + stream_list, {
  timeout: 10000,
  handshakeTimeout: 10000,
});
client.on('error', console.error);
client.on('open', (info) => {
  console.log('opened', info);
});
client.on('open', () => client.send('something'));
client.on('message', () => counter++
);
