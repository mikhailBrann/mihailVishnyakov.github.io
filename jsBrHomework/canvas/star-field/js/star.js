'use strict'
//инициализируем события
window.addEventListener('load', starHeven);



function starHeven() {
	const CANVAS = document.querySelector('canvas');
	let canvasContext = CANVAS.getContext('2d');
	let randomNum = (min, max) => (min + Math.random() * (max - min)).toFixed(1);
	let starsNumber =  Math.floor(randomNum(200, 400));

	let starConfig = () => {
		
		let starSize = randomNum(0, 1.1);
		let starShine = randomNum(0.8, 1);
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

		return starColor();
		
	};

	console.log(starConfig());
	console.log('test');
}