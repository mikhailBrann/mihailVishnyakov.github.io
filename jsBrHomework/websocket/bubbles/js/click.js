'use strict';

let bubleConnect = new WebSocket('wss://neto-api.herokuapp.com/mouse');
bubleConnect.addEventListener('open', () => {
	console.log(showBubbles(bubleConnect));
});
