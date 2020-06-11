'use strict';


let mainWrapp = document.getElementsByClassName('items-list')[0];

function itemToCard(event) {
	event.preventDefault();
	if(event.target.classList.contains('add-to-cart')) {
		let objToBasket = {
			title: event.target.dataset.title,
			price: event.target.dataset.price
		};

		addToCart(objToBasket);
	}
}


mainWrapp.addEventListener('click', itemToCard);