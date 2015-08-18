var myCanvas;
var shapeArr = [];
//set up grid
var shapeSetWidth;
var xOffset;
var shapeVspread;
var shapeHspread;
var boxWidth;
var boxHeight;
var num = 2;
var spacingG;

function Shape(xPos, yPos, radius, alpha) {
	this.xPos = xPos;
	this.yPos = yPos;
	this.origYPos = yPos;
	this.radius = radius;
	this.origRadius = radius;
	this.thirdRadius = this.radius/3;
	this.randomNo = random(1,10);
	this.fillColour = color(255,255,255,alpha);
}

Shape.prototype.paint = function() {
	noStroke();
	fill(this.fillColour);
	ellipse(this.xPos, this.yPos, this.radius, this.radius);
};

Shape.prototype.update = function() {
	var newXPos = Math.floor(frameCount / 500);

	//move forward if inside box
	if (this.xPos < boxWidth + spacingG / 12) {
		this.xPos = this.xPos += 1;

		if (this.xPos >= boxWidth/3) {
			var yNoise = noise(frameCount/500) * this.randomNo;
			//when moving reduce size
			if (this.radius > 1) {
				this.radius -= 0.015;
			}
			if (this.yPos > height/2) {
				this.yPos -= 0.5 * yNoise;
			}
			else if (this.yPos <= height) {
				this.yPos += 0.5 * yNoise;
			}
		}
	}
	//or return to start
	else {
		this.xPos = 0 - spacingG / 12;
		this.yPos = this.origYPos;
		this.radius = this.origRadius;
	}
};

function createShapes(spacing) {
	spacingG = spacing;
	xOffset = spacing/2;
	boxWidth = width;
	boxHeight = height;
	shapeVspread = boxHeight/spacing;
	shapeHspread = boxWidth/spacing;
	var colorOffset = 255 / shapeVspread;

	for (var i = 0; i < shapeHspread; i++) {
		for (var j = 0; j < shapeVspread/2; j++) {
			var newShapeTop;
			var alphaTop = j * (colorOffset * 2);
			newShapeTop = new Shape(i * spacing + xOffset, j * spacing + xOffset, spacing / 2, alphaTop);
			shapeArr.push(newShapeTop);
		}
		for (var k = 0; k < shapeVspread/2; k++) {
			var newShapeBottom;
			var alphaBottom = 255 - k * (colorOffset * 2);
			newShapeBottom = new Shape(i * spacing + xOffset, boxHeight/2 + k * spacing + xOffset, spacing / 2, alphaBottom);
			shapeArr.push(newShapeBottom);	
		}
	}
}

function setup() {
	myCanvas = createCanvas(800,600);
	background(0,0,0);
	createShapes(15);

	document.body.addEventListener('click', function() {
		//remove previous set of shapes
		shapeArr.splice(0, shapeHspread * shapeHspread);
		//bigger or smaller
		num * 2
		if (mouseX > boxWidth/2) {
			createShapes(spacingG + num);
		}
		else {
			createShapes(spacingG - num);
		}
	});
}

function draw() {
	background(0, 0, 0);
	for (var i = 0; i < shapeArr.length; i++) {
		shapeArr[i].update();
		shapeArr[i].paint();
	}
}