var handR;
var locx=200;
var locy=200;

function setup()
{
	createCanvas(400, 400);

	handR = PI/20;
}

function draw()
{
	background(255);
	draw_dinosaur(locx, locy, .3);
	dinoMovement();
}

function draw_dinosaur(x, y, sc)
{
	push();
		translate(x, y);
		scale(sc);
		strokeWeight(3);
		stroke(0, 128, 4);

		//other leg
		push();
		fill(0, 64, 2);
		strokeWeight(5);
		stroke(0, 64, 2);
		triangle(0, 97, -15, 125, -30, 95);
		pop();

		//body
		fill(0, 128, 4);
		beginShape();
			//back
			vertex(-19, -65);
			vertex(-19, -96);
			curveVertex(0, -96);
			curveVertex(15, -90);
			curveVertex(25, -70);
			curveVertex(30, -50);
			curveVertex(35, -30);
			curveVertex(40, -10);
			curveVertex(43, 0);
			curveVertex(47, 20);
			curveVertex(51, 40);
	
			//tail
			curveVertex(55, 48);
			curveVertex(63, 53);
			curveVertex(77, 54);
			curveVertex(90, 48);
			curveVertex(100, 40);
			curveVertex(110, 38);
			curveVertex(120, 42);
			curveVertex(119, 50);
			curveVertex(110, 60);
			curveVertex(100, 69);
			curveVertex(90, 77);
			curveVertex(80, 85);
			curveVertex(70, 90);
			vertex(70, 90);
	
			//leg
			vertex(50, 94);
			vertex(38, 95);
			vertex(33, 106);
			vertex(30, 115);
			vertex(25, 125);
			//vertex(25, 126);
			vertex(15, 115);
			vertex(10, 106);
			vertex(0, 97);
	
			//stomach
			curveVertex(-25, 95);
			curveVertex(-40, 85);
			curveVertex(-47, 60);
			curveVertex(-47, 40);
			curveVertex(-43, 10);
			curveVertex(-35, -10);
			curveVertex(-28, -20);
			curveVertex(-19, -37);
			vertex(-19, -37);
			vertex(-19, -65);
			vertex(-19, -96);
		endShape(CLOSE);

		//face
		push();
			translate(-25, -75);
			arc(6, 8, 70, 60, radians(90), radians(270));//face
			
		//eyes -- possibly make them move with mouse
			fill(0);
			ellipse(-17, -7, 25);
			ellipse(10, -7, 25);

			fill(255);
			noStroke();
			ellipse(-17, -7, 15);
			ellipse(10, -7, 15);

			fill(0);
			ellipse(-17, -5, 8);
			ellipse(10, -5, 8);
		pop();

		//hands
		fill(0, 190, 4);
		strokeWeight(1);
		stroke(0);

		push();
		translate(-40, 0);
		rotate(PI/7);
		beginShape();
		vertex(0, 0);
		vertex(-18, 15);
		vertex(2, 15);
		endShape();
		pop();

		push();
		translate(17, 0);
		rotate(handR);
		beginShape();
		vertex(0, 0);
		vertex(-24, 15);
		vertex(-2, 15);
		endShape();
		pop();

	pop();
}

function dinoMovement()
{
	//dino moves up
		if(keyIsDown(UP_ARROW)){
			locy-=10;
		}

	//dino moves down
		if (keyIsDown(DOWN_ARROW)){
			locy+=10;
		}

	//dino moves hand up
		if (keyIsDown(LEFT_ARROW)){
			handR-=PI/20;
		}

	//dino moves hand down
		if (keyIsDown(RIGHT_ARROW)){
			handR+=PI/20;
		}
}

 