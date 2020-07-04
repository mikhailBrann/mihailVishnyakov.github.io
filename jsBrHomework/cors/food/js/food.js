'use strict';
//отвалился background обертки, приделал свой
document.getElementsByClassName('wrapper')[0].style.background = 'linear-gradient(112.72013189013455deg, rgba(157, 189, 204,1) 4.927083333333334%,rgba(231, 61, 161,1) 97.84374999999999%)';

function recipeWrapp(recData, ratData, consumData) {

	//функция отправки запросов
	function recipeLoad(recipeUrl, callback = 'callbackRecipe') {
		return new Promise((done, fail) => {
			const recipeScript = document.createElement('script');
			recipeScript.src = `${recipeUrl}?callback=${callback}`;
			document.body.appendChild(recipeScript);
			window[callback] = done;
		});
	}

	function recipe(dataRecipe) {
		//заполняем карточку с рецептом
		document.querySelector('[data-pic]').style.backgroundImage = `url(${dataRecipe[0].pic})`;
		document.querySelector('[data-title]').innerText = dataRecipe[0].title;
		document.querySelector('[data-ingredients]').innerText = [...dataRecipe[0].ingredients];

		Promise.all([recipeLoad(ratData, 'callbackRating')]).then((dataRating) => {
			//заполняем рейтинг карточки
			document.querySelector('[data-rating]').innerText = dataRating[0].rating.toFixed(2);
			document.querySelector('[data-star]').style.width = `${dataRating[0].rating * 10}%`;
			document.querySelector('[data-votes]').innerText = `${dataRating[0].votes} оценок`;

			Promise.all([recipeLoad(consumData, 'callbackConsumers')]).then((dataConsumers) => {
				//создаем и добавляем ползователей
				dataConsumers[0].consumers.forEach((elem) => {
					let user = document.createElement('img');
					user.src = elem.pic;
					user.title = elem.name;
					document.querySelector('[data-consumers]').appendChild(user);
				});

				let usersCount = document.createElement('span');
				document.querySelector('[data-consumers]').appendChild(usersCount);
				usersCount.innerText = `(+${dataConsumers[0].total})`;
			});

		});

	}

	Promise.all([recipeLoad(recData)]).then(recipe);
}

recipeWrapp('https://neto-api.herokuapp.com/food/42', 'https://neto-api.herokuapp.com/food/42/rating', 'https://neto-api.herokuapp.com/food/42/consumers');