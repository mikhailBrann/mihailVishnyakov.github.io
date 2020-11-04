'use strict';
const CANVAS = document.getElementById('draw');
const CTX = CANVAS.getContext('2d');
CTX.beginPath();
CTX.rect(0, 0, 300, 150);
CTX.fillStyle = 'red';
CTX.clip();
CTX.fill();


let randomNumb = (min, max) => Math.round(min + Math.random() * (max - min));
const CURVES = {
	dots: []
};

let lineHeight = 100;

let drawing = (event) => {
	if(event.which == 1) {
		if(event.shiftKey) {
			if(lineHeight >= 5) {
				lineHeight -= 1;
			} else {
				lineHeight += 1;
			}
			console.log(lineHeight);
		}

		let curve = {
			posX: event.offsetX,
			posY: event.offsetY,
			color: 'hsl(280deg 100% 52%)',
			size: 20
		};

		CURVES.dots.push(curve);

		CURVES.dots.forEach((elem) => {
			CTX.beginPath();
			CTX.lineWidth = 10;
			CTX.lineJoin = 'round';
			CTX.lineCap = 'round';
			CTX.fillStyle = elem.color;
			CTX.moveTo(elem.posX,elem.posY);
			CTX.lineTo(elem.posX,elem.posY);
			CTX.strokeStyle = elem.color;
			CTX.stroke();
			//CTX.arc(elem.posX, elem.posY, elem.size, 0, 2 * Math.PI);
			//CTX.fill();
		});
	}
};




CANVAS.addEventListener('mousemove', (eventMove) => {
	//console.log(`positionX: ${event.offsetX}\n positionY:  ${event.offsetY}`);
	drawing(eventMove);	
});


//hsl(280deg 100% 52%);
