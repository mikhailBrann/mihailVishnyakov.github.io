'use strict';
let sizeCanvas = {
	canvX: document.documentElement.clientWidth, 
	canvY: document.documentElement.clientHeight
};

console.log(sizeCanvas);
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

let widthDirection = false;
let lineWidth = 100;
let lineColor = 359;

let drawing = (event) => {
	if(event.which == 1) {
		
		function repaint() {
			if (widthDirection) {
				if (lineWidth == 100) { 
				widthDirection = false;
				lineWidth--;  
				} else { 
				lineWidth++
				};
			} else {
				if (lineWidth == 5) {
				widthDirection = true;
				lineWidth++;  
				} else {
				lineWidth--
				};
			}

			if(event.shiftKey) {
				lineColor = lineColor == 0 ? 359: lineColor -=1;
			} else {
				lineColor = lineColor == 359 ? 0: lineColor +=1;
			}

			console.log(lineColor);

		}

		repaint();

		let curve = {
			posX: event.offsetX,
			posY: event.offsetY,
			color: 'hsl(' + lineColor + 'deg 100% 52%)',
			size: lineWidth
		};

		CURVES.dots.push(curve);

		CURVES.dots.forEach((elem) => {
			CTX.beginPath();
			CTX.lineWidth = elem.size;
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
