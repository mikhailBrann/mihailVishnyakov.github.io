'use strict'
const CANVAS = document.querySelector('canvas');
let canvasContext = CANVAS.getContext('2d');


//инициализируем события
window.addEventListener('load', starHeven);
CANVAS.addEventListener('click', starHeven);



function starHeven() {
	let starItemsArray = [];
	
	//background
	canvasContext.beginPath();
	canvasContext.rect(0,0,800,400);
	canvasContext.fillStyle = 'black';
	canvasContext.clip();
	canvasContext.fill();

	//рандомная функция для вычислений
	let randomNum = (min, max) => (min + Math.random() * (max - min)).toFixed(1);

	//количество звезд
	let starsNumber = Math.floor(randomNum(200, 400));
	

	//конфигуратор звезды
	let starConfig = () => {
		let starSize = randomNum(0, 1.1);
		let starShine = randomNum(0.8, 1);
		let starPositionX = Math.floor(randomNum(0, 400));
		let starPositionY = Math.floor(randomNum(0, 800));
		let starColor = () => {
			let colorResult;
			let colorRandom = randomNum(0, 3);

			if(colorRandom <= 1) {
				colorResult = '#ffffff';
			}	else if(colorRandom <= 2) {
				colorResult = '#ffe9c4';
			}	else if(colorRandom <= 3)  {
				colorResult = '#d4fbff';
			}

			return colorResult;
		};

		let star = {
			starSize: starSize,
			starShine: starShine,
			starColor: starColor(),
			positionX: starPositionX,
			positionY: starPositionY
		}

		return star;	
	};


	//отрисовываем звезды
	for(let i = 0; i <= starsNumber; i++) {
		let star = starConfig();
		canvasContext.beginPath();
		canvasContext.fillStyle = star.starColor;
		canvasContext.globalAlpha = star.starShine;
		canvasContext.arc(star.positionX, star.positionY, star.starSize, 0, 2 * Math.PI);
		canvasContext.fill();
	}

}