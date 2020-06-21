'use strict';

let bubleConnect = new WebSocket('wss://neto-api.herokuapp.com/mouse');

bubleConnect.addEventListener('open', () => {
	console.log('Вебсокет-соединение открыто');
});

bubleConnect.send(JSON.stringify({
	test: 'ТЕСТ'
}));

bubleConnect.addEventListener('message', event => {
	console.log(`сообщение с сервера: ${event.data}`);
});

bubleConnect.addEventListener('error', error => {
	console.log(`ошибка: ${error.data}`);
});