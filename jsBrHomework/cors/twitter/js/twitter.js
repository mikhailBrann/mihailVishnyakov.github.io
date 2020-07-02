'use strict';

Promise.all([loadTwitt('callback', 'https://neto-api.herokuapp.com/twitter/jsonp')]).then(createTwittCart);


function loadTwitt(callbackName, data[0]Url) {
	return new Promise((done, fail) => {
		const genericScript = document.createElement('script');
		genericScript.src = `${data[0]Url}?callback=${callbackName}`;
		document.body.appendChild(genericScript);
		window[callbackName] = done;
	});
}

function createTwittCart(data) {
	console.log(data[0]);
	let twitterContainer = document.getElementsByClassName('container')[0];
	twitterContainer.querySelector('[data[0]-wallpaper]').src = data[0].wallpaper;
	twitterContainer.querySelector('[data[0]-username]').innerText = data[0].username;
	twitterContainer.querySelector('[data[0]-description]').innerText = data[0].description;
	twitterContainer.querySelector('[data[0]-pic]').src = data[0].pic;
	twitterContainer.querySelector('[data[0]-tweets]').innerText = data[0].tweets;
	twitterContainer.querySelector('[data[0]-followers]').innerText = data[0].followers;
	twitterContainer.querySelector('[data[0]-following]').innerText = data[0].following;
}