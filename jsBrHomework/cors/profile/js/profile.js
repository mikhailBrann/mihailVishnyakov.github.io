'use strict';

//Заполняем профиль карточки и технологий
function createProfile(profileData) {
	document.querySelector('[data-name]').innerText = profileData[0].name;
	document.querySelector('[data-description]').innerText = profileData[0].description;
	document.querySelector('[data-pic]').src = profileData[0].pic;
	document.querySelector('[data-position]').innerText = profileData[0].position;

	//делаем промис для технологий и инициализируем его
	function loadTechnology(callback) {
		return new Promise((done, fail) => {
			const technologyScript = document.createElement('script');
			technologyScript.src = `https://neto-api.herokuapp.com/profile/${profileData[0].id}/technologies?callback=${callback}`;
			document.body.appendChild(technologyScript);
			window[callback] = done;
		});
	}

	Promise.all([loadTechnology('callbackTechnology')]).then((data) => {
		data[0].forEach((elem) => {
			let technology = `<span class="devicons devicons-${elem}"></span>`;
			document.querySelector('[data-technologies]').innerHTML += technology;
		});

		let profileCont = document.getElementsByClassName('content')[0];
		profileCont.style.display = 'initial';
	});
}

//делаем промис для карточки и инициализируем его
function loadProfile(callback, url) {
	return new Promise((done, fail) => {
		callback += 'Profile';
		const profileScript = document.createElement('script');
		profileScript.src = `${url}?callback=${callback}`;
		document.body.appendChild(profileScript);
		window[callback] = done;
	});
}

Promise.all([loadProfile('callback','https://neto-api.herokuapp.com/profile/me')]).then(createProfile);