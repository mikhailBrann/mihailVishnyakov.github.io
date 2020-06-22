'use strict';

let chatWrapp = document.getElementsByClassName('chat')[0];
let messageBox = chatWrapp.getElementsByClassName('message-box')[0];
let messageInput = messageBox.getElementsByClassName('message-input')[0];
let messageSubmit = messageBox.getElementsByClassName('message-submit')[0];

let chatStatus = chatWrapp.getElementsByClassName('chat-status')[0];

let messagesContent = chatWrapp.getElementsByClassName('messages-content')[0];
let messagesTemplates = chatWrapp.getElementsByClassName('messages-templates')[0];

//создаем дату для сообщений
let thisDate = () => {
	let dateMessage = new Date();
	let dateResult = `${dateMessage.getHours() <= 9 ? '0' : ''}${dateMessage.getHours()}:${dateMessage.getMinutes() <= 9 ? '0' : ''}${dateMessage.getMinutes()}`
	return dateResult;
};

//удаляем лишние сообщения из чата
let removeMess = () => {
	let messagesContentLenght = chatWrapp.getElementsByClassName('messages-content')[0].children.length;
	if(messagesContentLenght >= 3) {
 		document.querySelector('.messages-content *').remove(); 
	}
};


//обработка открытия WEbSocket
window.addEventListener('load', () => {
	let chatConnected = new WebSocket('wss://neto-api.herokuapp.com/chat');

	//вешаем события по клику и enter
	messageSubmit.addEventListener('click', sendingMessage);
	messageSubmit.addEventListener('keyup', (event) => {
		if(event.enter) {
			sendingMessage();
		}
	});

	//функция отправки сообщений
	function sendingMessage(event) {
		event.preventDefault();

		let userMessage = {
			userMess: messageInput.value,
			userDate: thisDate()
		};

		//отсылаем сообщение пользователя
		chatConnected.send(JSON.stringify(userMessage));

		//выводим сообщение пользователя
		let userPublickMess = messagesTemplates.querySelector('.message-personal').cloneNode(true);
		userPublickMess.querySelector('.message-text').innerText = userMessage.userMess;
		userPublickMess.querySelector('.timestamp').innerText = userMessage.userDate;
		messagesContent.appendChild(userPublickMess);

		//возвращаем состояние поля ввода после отправки формы
		messageInput.value = '';
		//усли много сообщений в чате, то удаляем первое
		removeMess();
	}

	chatConnected.addEventListener('open', () => {
		chatStatus.innerText = chatStatus.getAttribute('data-online');
		messageSubmit.removeAttribute('disabled');

		//установка статуса пользователя
		let userStatus = messagesTemplates.querySelector('.message-status').cloneNode(true);
		userStatus.querySelector('.message-text').innerText = '«Пользователь появился в сети»';
		messagesContent.appendChild(userStatus);
		

	});

	//обработка закрытия WEbSocket
	chatConnected.addEventListener('close', () => {

		chatStatus.innerText = chatStatus.getAttribute('data-offline');
		messageSubmit.setAttribute('disabled', '');

		let userStatus = messagesTemplates.querySelector('.message-status').cloneNode(true);
		userStatus.querySelector('.message-text').innerText = '«Пользователь не в сети»';
		messagesContent.appendChild(userStatus);
	});


	chatConnected.addEventListener('message', (event) => {
	
		//обрабатываем поведение бота
		let botStatus = messagesTemplates.querySelector('.loading').cloneNode(true);
		
		if(event.data == '...'){
			botStatus.querySelector('span').innerText = 'собеседник сейчас печатает сообщение';
			messagesContent.appendChild(botStatus);
		} else {
			//удаляем уведомление о том, что бот печатает
			if(messagesContent.querySelector('.loading')){
				botStatus.remove();
			}

			//выводим сообщение бота
			let botMessage = {
				botMess: event.data,
				botDate: thisDate()
			};

			//ищем шаблон сообщений для бота
			let seachBotMessElem = messagesTemplates.querySelectorAll('.message');

			seachBotMessElem.forEach((botMess) => {
				if(botMess.className == 'message') {
					let botPublickMess = botMess.cloneNode(true);

					botPublickMess.querySelector('.message-text').innerText = botMessage.botMess;
					botPublickMess.querySelector('.timestamp').innerText = botMessage.botDate;

					messagesContent.appendChild(botPublickMess);
				}
			});
		}
		
	});

});


