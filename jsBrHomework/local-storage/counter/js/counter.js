'use strict';
let controlButtonsWrapp = document.getElementById('increment').parentNode;
let counterValueWrapp = document.getElementById('counter');

//задаем значение счетчика по умолчанию
counterValueWrapp.textContent = 0;


function castomCounter(event) {
	let countItem = parseInt(counterValueWrapp.textContent);
	if(event.target.id == 'increment') {
		countItem++;
	} else if(event.target.id == 'decrement' && countItem > 0) {
		countItem--;
	} else if(event.target.id == 'reset') {
		countItem = 0
	}

	//записывем значение в localStorage
	localStorage.countValue = countItem;
	counterValueWrapp.textContent = localStorage.countValue;
}

//если хранилище не пустое, то выводим данные из localStorage
if(localStorage.length != 0){
	counterValueWrapp.textContent = localStorage.countValue;
}

controlButtonsWrapp.addEventListener('click', castomCounter);
