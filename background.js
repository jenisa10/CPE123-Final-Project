var scene1;
var scene2;
var scene3;
var time = 60;
var grass_g=[];
var grass_b=[];
var grass_x=[];
var grass_y=[];
var grass_dx=[];
var grass_dy=[];

const dino_x_min = 100;
const dino_x_max = 1100;
const dino_y_min = 550;
const dino_y_max = 750;
const dino_scale = 0.5;
const dino_rotate_beg = 2.2;
const dino_rotate_end = -0.5;
const dino_hit_vel = -0.3;
const dino_return_vel = 0.45;

var p1_x = 250, p1_y = 600, p1_handR = dino_rotate_beg, p1_state = 0; // state 0: idle, 1: resetting, 2: hitting
var p2_x = 950, p2_y = 600, p2_handR = dino_rotate_beg, p2_state = 0;

var birdie_x, birdie_y;

function setup(){
	createCanvas(1200, 800);
	scene1 = false;
	scene2 = true;
	scene3 = false;
	grass_initialize();
}

function draw(){
	if (scene1 == true) {
		title();
	}
	if (scene2 == true) {
		back();
		drawMounts(250, 50, 120, 220, 0.005);
		board();
		timer();
		//grass();
		court();
		updatePlayers();
		drawPlayers();
	}
	if (scene3 == true){
		endPage();
	}
}

function updatePlayers() {
	if(keyIsDown(UP_ARROW)){
		p1_y-=7;
	}
	if (keyIsDown(DOWN_ARROW)){
		p1_y+=7;
	}
	if (keyIsDown(LEFT_ARROW)){
		p1_x-=7;
	}
	if (keyIsDown(RIGHT_ARROW)){
		p1_x+=7;
	}
	p1_handR += p1_state > 0 ? (p1_state == 2 ? dino_hit_vel : dino_return_vel) : 0;
	if (keyIsDown(190)){
		p1_state = 2;
	}
	if (p1_state == 2 && p1_handR <= dino_rotate_end) {
		p1_state = 1;
	} else if (p1_state == 1 && p1_handR >= dino_rotate_beg) {
		p1_state = 0;
	}
}

function drawPlayers() {
	draw_dinosaur(p1_x, p1_y, dino_scale, p1_handR, 1);
	draw_dinosaur(p2_x, p2_y, dino_scale, p2_handR, 2);
}

function back(){
	fill(180, 220, 255);
	rect(0, 0, 1200, 800);
	var color1 = color(0, 140, 200);
	var color2 = color(255, 165, 200);
	setGradient(0, 0, width, 500, color1, color2, "Y");

	noStroke();
	fill(100);
	rect(1050, 0, 150, 50);
	fill(100);
	rect(0, 0, 150, 50);
	fill(255);
	text('HOME', 25, 40);
	text('END', 1090, 40);
}

function court(){
	push();
	translate(0, 50);
		strokeWeight(8);
		stroke(255);
		fill(255, 182, 180);
		quad(50, 700, 100, 500, 1100, 500, 1150, 700);
		stroke(255);
		strokeWeight(5);
		line(70, 700, 120, 500);
		line(1080, 500, 1130, 700);
		line(95, 520, 1105, 520);
		line(55, 680, 1145, 680);
		line(450, 500, 425, 700);
		line(750, 500, 775, 700);
		line(440, 600, 760, 600);
		strokeWeight(12);
		stroke(150);
		line(600, 500, 600, 440);
		strokeWeight(5);
		stroke(180);
		line(600, 445, 600, 675);
		stroke(150);
		strokeWeight(12);
		line(600, 700, 600, 660);
	pop();
}

function board(){
	strokeWeight(12);
	stroke(100);
	fill(100);
	rect(350, 50, 500, 230, 20);
	line(450, 200, 450, 470);
	line(750, 200, 750, 470);
	stroke(255);
	strokeWeight(2);
	line(345, 230, 855, 230);
	line(345, 110, 855, 110);
	line(600, 45, 600, 110);
	fill(255);
	noStroke();
	textSize(36);
	textFont('Courier New');
	text('TIME', 400, 270);
	text('Player 1', 380, 90);
	text('Player 2', 640, 90);
	//time
	if(time <= 60){
		fill(255);
		text(time, width/2, 270);
	}
}

function timer(){
	if (frameCount % 6 == 0 && time > 0){
		time --;
	}
}

function grass(){
	noStroke();
	for (var i=0;i<grass_x.length;++i){
		fill(50, grass_g[i], grass_b[i]);
		ellipse(grass_x[i]+grass_dx[i], grass_y[i]+grass_dy[i], 5, 30);
	}
}

function grass_initialize(){
	for (var y=0; y < height; y+= 5){
		for (var x=0; x < width; x+=5){
			if  (impl_line(x, y, 0, 470, 1200, 470) > 0){
				grass_g.push(random(180,240));
				grass_b.push(random(150,180));
				grass_dx.push(random(-2,2));
				grass_dy.push(random(-5,5));
				grass_x.push(x);
				grass_y.push(y);
			}
		}
	}
}

function drawMounts(peak, range, color, scale, noiseScale) {
	for (var x=0; x < width; x++) {
	  var noiseVal = noise((500+x)*noiseScale, 500*noiseScale);
	  stroke(color, range);
	  line(x, (peak) + noiseVal*scale, x, height);
	}
}

function endPage(){
	background(120, 180, 150);
	fill(255);
	textFont('Courier New');
	textSize(100);
	text('CONGRATULATIONS!', 150, 100);
	textSize(50);
	text('Thank you for playing the game.', 150, 210);
	text('Made with <3 by', 400, 280);
	text('David Chen', 100, 380);
	text('Veronica Guzman', 100, 480);
	text('Iris Ho', 750, 380);
	text('Jenisa Nguyen', 750, 480);
	fill(100);
	rect(365, 580, 500, 100);
	fill(255);
	textSize(70);
	text('PLAY AGAIN', 400, 645);
}

function title(){
	background(230, 200, 230);
	fill(255);
	textFont('Courier New');
	textSize(80);
	text('T-Rex Plays Badminton', 100, 100);
	fill(255);
	ellipse(600, 400, 100);
	fill(100);
	rect(400, 540, 400, 160);
	fill(255);
	textSize(90);
	text('START', 460, 645);
}

function impl_line(x, y, x0, y0, x1, y1){
	return ((y0-y1)*x + (x1-x0)*y + x0*y1 - x1*y0);
}

function setGradient(x, y, w, h, c1, c2, axis) {
	noFill();
	if (axis == "Y") {  // Top to bottom gradient
	  for (let i = y; i <= y + h; i++) {
		var inter = map(i, y, y + h, 0, 1);
		var c = lerpColor(c1, c2, inter);
		stroke(c);
		line(x , i, x + w, i);
	  }
	}
}

function mousePressed() {
	if (scene1 == true) {
		if (mouseX > 400 && mouseX < 800 && mouseY > 540 && mouseY < 700) {
			scene2 = true;
			scene1 = false;
			scene3 = false;
		}
	}
	if (scene2 == true) {
		if (mouseX > 1050 && mouseX < 1200 && mouseY > 0 && mouseY < 50) {
		//mouseX > 1050 && mouseX < 1200 && mouseY > 0 && mouseY < 50
			scene3 = true;
			scene2 = false;
			scene1 = false;
		}
		if (mouseX > 0 && mouseX < 150 && mouseY > 0 && mouseY < 50) {
			//mouseX > 1050 && mouseX < 1200 && mouseY > 0 && mouseY < 50
				scene1 = true;
				scene2 = false;
				scene3 = false;
			}
	}	
	if (scene3 == true) {
		if (mouseX > 400 && mouseX < 800 && mouseY > 540 && mouseY < 700) {
		//mouseX > 1050 && mouseX < 1200 && mouseY > 0 && mouseY < 50
			scene1 = true;
			scene2 = false;
			scene3 = false;
		}
	}
}

function draw_dinosaur(x, y, sc, handR, player) {
	x_multi = player == 1 ? -1 : 1;
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
		triangle(x_multi * 0, 97, x_multi * -15, 125, x_multi * -30, 95);
		pop();

		//body
		fill(0, 128, 4);
		beginShape();
			//back
			vertex(x_multi * -19, -65);
			vertex(x_multi * -19, -96);
			curveVertex(x_multi * 0, -96);
			curveVertex(x_multi * 15, -90);
			curveVertex(x_multi * 25, -70);
			curveVertex(x_multi * 30, -50);
			curveVertex(x_multi * 35, -30);
			curveVertex(x_multi * 40, -10);
			curveVertex(x_multi * 43, 0);
			curveVertex(x_multi * 47, 20);
			curveVertex(x_multi * 51, 40);
	
			//tail
			curveVertex(x_multi * 55, 48);
			curveVertex(x_multi * 63, 53);
			curveVertex(x_multi * 77, 54);
			curveVertex(x_multi * 90, 48);
			curveVertex(x_multi * 100, 40);
			curveVertex(x_multi * 110, 38);
			curveVertex(x_multi * 120, 42);
			curveVertex(x_multi * 119, 50);
			curveVertex(x_multi * 110, 60);
			curveVertex(x_multi * 100, 69);
			curveVertex(x_multi * 90, 77);
			curveVertex(x_multi * 80, 85);
			curveVertex(x_multi * 70, 90);
			vertex(x_multi * 70, 90);
	
			//leg
			vertex(x_multi * 50, 94);
			vertex(x_multi * 38, 95);
			vertex(x_multi * 33, 106);
			vertex(x_multi * 30, 115);
			vertex(x_multi * 25, 125);
			//vertex(x_multi * 25, 126);
			vertex(x_multi * 15, 115);
			vertex(x_multi * 10, 106);
			vertex(x_multi * 0, 97);
	
			//stomach
			curveVertex(x_multi * -25, 95);
			curveVertex(x_multi * -40, 85);
			curveVertex(x_multi * -47, 60);
			curveVertex(x_multi * -47, 40);
			curveVertex(x_multi * -43, 10);
			curveVertex(x_multi * -35, -10);
			curveVertex(x_multi * -28, -20);
			curveVertex(x_multi * -19, -37);
			vertex(x_multi * -19, -37);
			vertex(x_multi * -19, -65);
			vertex(x_multi * -19, -96);
		endShape(CLOSE);

		//face
		push();
			translate(x_multi * -25, -75);
			arc(x_multi * 6, 8, x_multi * 70, 60, radians(90), radians(270));//face
			
		//eyes -- possibly make them move with mouse
			fill(0);
			ellipse(x_multi * -17, -7, 25);
			ellipse(x_multi * 10, -7, 25);

			fill(255);
			noStroke();
			ellipse(x_multi * -17, -7, 15);
			ellipse(x_multi * 10, -7, 15);

			fill(0);
			ellipse(x_multi * -17, -5, 8);
			ellipse(x_multi * 10, -5, 8);
		pop();

		//hands
		fill(0, 190, 4);
		strokeWeight(1);
		stroke(0);
		//hand that won't move
		push();
			translate(x_multi * -40, 0);
			rotate(x_multi * PI/7);
			beginShape();
			vertex(x_multi * 0, 0);
			vertex(x_multi * -18, 15);
			vertex(x_multi * 2, 15);
			endShape();
		pop();
		//hand that moves
		push();
			translate(x_multi * 17, 0);
			rotate(x_multi * handR);

			push();
				//racket
				translate(x_multi * -30, 15);
				rotate(x_multi * 2*PI/3)
				scale(sc*3);
				fill(0);
				rect(player == 1 ? -2 : -3, -14, 6, 30);
				rect(0, 15, 1, 80);
				fill(0,0,0,0);
				stroke(32);
				push();
					scale(2);
					translate(0, -40)
					ellipse(x_multi * 0, 105, x_multi * 45, 80);

					line(x_multi * 5   , 142 , x_multi * 5   , 67);
					line(x_multi * -5  , 142 , x_multi * -5  , 67);
					line(x_multi * -15 , 135 , x_multi * -15 , 75);
					line(x_multi * 15  , 135 , x_multi * 15  , 75);

					line(x_multi * 0   , 145 , x_multi * 0   , 65);
					line(x_multi * -10 , 140 , x_multi * -10 , 70);
					line(x_multi * -20 , 125 , x_multi * -20 , 85);
					line(x_multi * 10  , 140 , x_multi * 10  , 70);
					line(x_multi * 20  , 120 , x_multi * 20  , 89);
					line(x_multi * -22 , 105 , x_multi * 22  , 105);
					line(x_multi * -22 , 95  , x_multi * 21  , 95);
					line(x_multi * -20 , 85  , x_multi * 20  , 85);
					line(x_multi * -15 , 75  , x_multi * 15  , 75);
					line(x_multi * -22 , 115 , x_multi * 20  , 115);
					line(x_multi * -20 , 125 , x_multi * 19  , 125);
					line(x_multi * -15 , 135 , x_multi * 14  , 135);
				pop();
			pop();

			beginShape();
			vertex(x_multi * 0, 0);
			vertex(x_multi * -24, 15);
			vertex(x_multi * -2, 15);
			endShape();
		pop();

	pop();
}
function racket() {
	translate(x+17, y)
	fill(255);
	ellipse(0, 0, 20);
 }
