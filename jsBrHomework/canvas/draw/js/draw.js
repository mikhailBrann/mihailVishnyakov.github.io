'use strict';
let sizeCanvas = {
	canvX: document.documentElement.clientWidth, 
	canvY: document.documentElement.clientHeight
};


const CANVAS = document.getElementById('draw');
CANVAS.width = sizeCanvas.canvX;
CANVAS.height = sizeCanvas.canvY;


const CTX = CANVAS.getContext('2d');
CTX.beginPath();
CTX.rect(0, 0, sizeCanvas.canvX, sizeCanvas.canvY);
CTX.fillStyle = 'red';
CTX.fill();
CTX.clip();


let randomNumb = (min, max) => Math.round(min + Math.random() * (max - min));
const CURVES = {
	dots: []
};

let widthDirection = false;
let lineWidth = 100;
let lineColor = 359;
let curves = [];

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
		CTX.beginPath();
		CTX.lineWidth = lineWidth;
		CTX.lineJoin = 'round';
		CTX.lineCap = 'round';
		CTX.moveTo(event.offsetX, event.offsetY);
		CTX.lineTo(event.offsetX, event.offsetY);
		CTX.strokeStyle = 'hsl(' + lineColor + 'deg 100% 52%)';
		CTX.stroke();
		CTX.closePath();

	}
};




CANVAS.addEventListener('mousemove', (eventMove) => {
	drawing(eventMove);	
});

