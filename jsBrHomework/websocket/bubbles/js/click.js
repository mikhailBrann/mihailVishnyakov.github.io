'use strict';

let bubleConnect = new WebSocket('wss://neto-api.herokuapp.com/mouse');
console.log(showBubbles(bubleConnect));