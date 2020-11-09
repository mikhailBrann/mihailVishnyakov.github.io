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
		function makePoint(x, y) {
			return [x, y];
		};

		curves.push(makePoint(event.offsetX, event.offsetY, event.shiftKey));

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

			CTX.beginPath();
			CTX.lineWidth = lineWidth;
			CTX.lineJoin = 'round';
			CTX.lineCap  = 'round';
			CTX.strokeStyle = `hsl(${lineColor}, 100%, 50%)`;
		  
			CTX.moveTo(curves[0], curves[1]);
			for (let i = 1; i <= curves.length - 1; i++) {
				CTX.lineTo(...curves[i]);    
			  }
			CTX.stroke();
			CTX.closePath();
			curves.splice(0, curves.length - 2);

			
		}

		repaint();

	}
};




CANVAS.addEventListener('mousemove', (eventMove) => {
	drawing(eventMove);	
});

