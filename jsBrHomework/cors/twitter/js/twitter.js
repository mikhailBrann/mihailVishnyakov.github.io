'use strict';

Promise.all([loadTwitt('callback', 'https://neto-api.herokuapp.com/twitter/jsonp')]).then(createTwittCart);


function loadTwitt(callbackName, dataUrl) {
	return new Promise((done, fail) => {
		const genericScript = document.createElement('script');
		genericScript.src = `${dataUrl}?callback=${callbackName}`;
		document.body.appendChild(genericScript);
		window[callbackName] = done;
	});
}

function createTwittCart(data) {
	console.log(data);
	let twitterContainer = document.getElementsByClassName('container')[0];
	twitterContainer.querySelector('[data-wallpaper]').src = data.wallpaper;
	twitterContainer.querySelector('[data-username]').innerText = data.username;
	twitterContainer.querySelector('[data-description]').innerText = data.description;
	twitterContainer.querySelector('[data-pic]').src = data.pic;
	twitterContainer.querySelector('[data-tweets]').innerText = data.tweets;
	twitterContainer.querySelector('[data-followers]').innerText = data.followers;
	twitterContainer.querySelector('[data-following]').innerText = data.following;
}