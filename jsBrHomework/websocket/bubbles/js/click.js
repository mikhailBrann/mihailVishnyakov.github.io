'use strict';

let bubleConnect = new WebSocket('wss://neto-api.herokuapp.com/mouse');

bubleConnect.addEventListener('open', () => {
	console.log('Вебсокет-соединение открыто');

	let bubbleCoordinate = document.addEventListener('mousedown', createClickBubble);

	function createClickBubble(event) {
		let bubble = {
			x: event.clientX,
			y: event.clientY
		}
		bubleConnect.send(JSON.stringify(bubble));
	}

	showBubbles(bubleConnect);
});

