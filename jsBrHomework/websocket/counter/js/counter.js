'use strict';

window.addEventListener('load', () => {
	let counterConnect = new WebSocket('wss://neto-api.herokuapp.com/counter');
	let counterWrapp = document.getElementsByClassName('counter')[0];
	let errorsWrapp = document.querySelector('output.errors');

	counterConnect.addEventListener('open', () => {
		counterConnect.addEventListener('message', event => {
			let counterData = JSON.parse(event.data);

			counterWrapp.innerText = counterData.connections;
			errorsWrapp.innerText = counterData.errors;
		});
	});

	window.addEventListener('beforeunload', () => {
		counterConnect.close(1000);
	});
});


