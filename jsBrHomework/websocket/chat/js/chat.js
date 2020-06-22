'use strict';

let chatWrapp = document.getElementsByClassName('chat')[0];
let messageBox = chatWrapp.getElementsByClassName('message-box')[0];
let messageInput = messageBox.getElementsByClassName('message-input')[0];
let messageSubmit = messageBox.getElementsByClassName('message-submit')[0];

let chatStatus = chatWrapp.getElementsByClassName('chat-status')[0];

let messagesContent = chatWrapp.getElementsByClassName('messages-content')[0];
let messagesTemplates = chatWrapp.getElementsByClassName('messages-templates')[0];







window.addEventListener('load', () => {
	let chatConnected = new WebSocket('wss://neto-api.herokuapp.com/chat');

	chatConnected.addEventListener('open', () => {
		chatStatus.innerText = chatStatus.getAttribute('data-online');
		messageSubmit.removeAttribute('disabled');

		chatConnected.addEventListener('close', ()=> {
			chatStatus.innerText = chatStatus.getAttribute('data-offline');
			messageSubmit.addAttribute('disabled');
		});
	});

	chatConnected.addEventListener('message', (event) => {
		console.log(event.data);
	});

	setTimeout(1000, () => chatConnected.close(1000));
});


/*
Интерфейс
Весь интерфейс чата сосредоточен в теге с классом chat. Выполняйте поиск компонентов чата только в нём.+

Форма отправки нового сообщения имеет класс message-box. Поле ввода сообщения имеет класс message-input.+ 
Кнопка «Отправить сообщение» имеет класс message-submit.+

Все новые сообщения для отображения необходимо отображать в блоке с классом messages-content.+


Есть четыре типа сообщений. Их шаблоны доступны в скрытом контейнере с классом messages-templates, у всех имеется класс message:


Сообщение с классом loading — информация о том, что собеседник сейчас печатает сообщение.

Сообщение от собеседника без дополнительного класса и сообщение от пользователя с классом message-personal имеют элементы с классами message-text и timestamp,
в тела которых следует поместить текст сообщения и время добавления.

Сообщение с классом message-status — вывод разных уведомлений. Также имеет элемент с классами message-text для вывода текста уведомления.

Элемент с классом chat-status. Необходимо использовать для вывода состояния чата. 

Если собеседник в сети, то следует подставить в тело текст из атрибута data-online, иначе — из data-offline.





Функционал
При открытии страницы необходимо установить соединение с веб-сокетом по адресу wss://neto-api.herokuapp.com/chat.+

Если соединение успешно установлено, необходимо обновить статус чата,
а также активировать кнопку «Отправить сообщение» и вывести уведомление с текстом «Пользователь появился в сети».+

При получении сообщения по веб-сокет соединению необходимо проверить текст сообщения. Если он равен ... (три точки),
то необходимо отобразить информацию о том, что собеседник сейчас печатает сообщение. Если текст сообщения другой,
то необходимо отобразить сообщение с этим текстом. А информацию о том, что собеседник печатает, необходимо удалить.

При отправке сообщения пользователем через форму (кнопка «Отправить сообщение» или клавиша Enter в поле ввода сообщения) необходимо 
текст сообщения отправить по веб-сокет соединению и отобразить сообщение пользователя в общем списке.

Время сообщений в обоих случаях берем текущее на момент отображения. Учитывайте, что часы и минуты всегда должны иметь 2 символа, например, 09:03.

Если соединение с веб-сокет сервером закрывается, то необходимо поменять статус чата и деактивировать кнопку «Отправить сообщение»,
а также вывести уведомление с текстом «Пользователь не в сети».
*/