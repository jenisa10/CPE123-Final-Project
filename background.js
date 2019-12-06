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
const dino_rotate_beg = 2.3;
const dino_rotate_end = 1.1;
const dino_hit_vel = -0.2;
const dino_return_vel = 0.07;
const dino_dx_speed = 10;
const dino_dy_speed = 8;

var p1_x = 250, p1_y = 600, p1_handR = dino_rotate_beg, p1_state = 0; // state 0: idle, 1: resetting, 2: swinging
var p2_x = 950, p2_y = 600, p2_handR = dino_rotate_beg, p2_state = 0;

var p1_score = 0, p2_score = 0;
var dead=false;

var birdie_x, birdie_y;
var birdie_dx, birdie_dy;
const birdie_scale = 0.7;
const gravity = 0.8;

var newGame = true;

// declare of a variable to represent a particle system
var fireW1;
var birdie_sparks = [];
var end_fireworks = [];
var fcol = 1;
var bpx;
var bpy;

//var birdie_dir = [];
//var birdie_sc;
//var birdie_theta = [];
//var birdie_thetaAdd = [];

//definition of a particle
function birdie_particle(x , y) {
	this.accelY = 0.01; //gravity
	this.velX = random(.5, 1.3);
	this.velY = random(-1.15, 1.15);

	
	this.pcolorR=255
	this.pcolorG=243+random(-50,50)
	this.pcolorB=95+random(-50,50)
	
	this.locX = x;
	this.locY = y;
	this.r = 8.0;
	this.life = 80;
	// a function to update the particle each frame
	this.updateP = function() {
		this.velY += this.accelY;
		this.locX += this.velX;
		this.locY += this.velY;
		this.life -= 1;
	};
	// function to draw a particle
	this.renderP = function() {
		noStroke();
		push();
			fill(this.pcolorR, this.pcolorG, this.pcolorB, this.life);
			translate(this.locX, this.locY);
			ellipse(0, 0, this.r, this.r);
		pop();
	};
}


// define a group of particles as a particleSys
function birdie_PSys(sX, sY, num) {
	// the data - lots of particles
	this.particles = [];
	for (var i=0; i < num; i++) {
		this.particles.push(new birdie_particle(sX, sY));
	}
	// function defining what to do each frame
	this.run = function() {
		if(this.particles.length>0){
			if(this.particles[0].life<=0){
				this.particles.splice(0,1);
			}
		}
		for (var i=0; i < this.particles.length; i++) {
			//update each particle per frame
			this.particles[i].updateP();
			this.particles[i].renderP();
		}
	}
}


function birdie_hit(){
	birdie_sparks.push(new birdie_PSys(birdie_x, birdie_y, random(25, 45)));
}

//for the fireworks @ end screen
// end firework vars
var end_fireworks = [];
function end_Particle(x , y) 
{
    this.accelY = 0.05; //gravity
    this.velX = random(-1, 1);
    this.velY = random(.5, 1.3);

   if(fcol % 3 < 1){
      this.pcolorR=255
      this.pcolorG=166+random(-50,50)
      this.pcolorB=247+random(-50,50)
   }
   else if(fcol % 3 < 2){
      this.pcolorR=145+random(-50,50)
      this.pcolorG=255
      this.pcolorB=176+random(-50,50)
   }
   else if(fcol % 3 < 3){
      this.pcolorR=145+random(-50,50)
      this.pcolorG=255+random(-50,50)
      this.pcolorB=255
   }
   this.locX = x;
   this.locY = y;
   this.r = 5.0;
   this.life = 255;
  
	this.updateP = function()
	{
		this.velY += this.accelY;
		this.locX += this.velX;
		this.locY += this.velY;
		this.life -= 2.5;
	};
  
	this.renderP = function() 
	{
		noStroke();
		push();
			fill(this.pcolorR, this.pcolorG, this.pcolorB, this.life);
			translate(this.locX, this.locY);
			ellipse(0, 0, this.r, this.r);
		pop();
	};
} //end of particle object definition

function end_PSys(sX, sY, num)
{
	this.particles = [];
	for (var i=0; i < num; i++) 
	{
		this.particles.push(new end_Particle(sX, sY));
	}
  
	this.run = function() 
	{
		for (var i=0; i < this.particles.length; i++) 
		{
			//update each particle per frame
			this.particles[i].updateP();
			this.particles[i].renderP();
		}
	}
}

function endFireworkStart(){
	fcol++
	end_fireworks.push(new PSys(random(width), random(height), random(25, 30)));
}

function birdie(px, py, dx, dy, s){
	push();
		translate(px, py);
		scale(s);
		rotate(atan2(dy, dx)+PI/2);
		stroke(255);
		strokeWeight(3);
		fill(255);
		ellipse(0, 0, 10);
		birdie_lines(5);
		birdie_lines(-5);
		birdie_lines(15);
		birdie_lines(-15);
		birdie_lines(25);
		birdie_lines(-25);
		stroke(0)
		arc(0, 0, 10, 10, PI/3, 2*PI/3)
	pop();
}
function birdie_lines(rot){
	push();
		rotate(radians(rot));
		line(0, 0, 0, 50);
		ellipse(0, 50, 4, 10)
	pop();
}

function initGame() {
	birdie_x = 0;
	birdie_y = 0;
	birdie_dx = 80;
	birdie_dy = 0;
	p1_x = 250, p1_y = 600, p1_handR = dino_rotate_beg, p1_state = 0; // state 0: idle, 1: resetting, 2: swinging
	p2_x = 950, p2_y = 600, p2_handR = dino_rotate_beg, p2_state = 0;
	dead = false;
}

function setup(){
	createCanvas(1200, 800);
	//birdie_x = 950;
	//birdie_y = 200;
	//birdie_dx = -180;
	//birdie_dy = 5;
	//
	initGame();
	scene1 = false;
	scene2 = true;
	scene3 = false;
	//grass_initialize();
}

function draw(){
	//bpx = mouseX;
	//bpy = mouseY;
	//background(150);
	for(i=0;i<end_fireworks.length;i++){
		end_fireworks[i].run()
		}

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
		updateBirdie();
		birdie(birdie_x, birdie_y, birdie_dx, birdie_dy, birdie_scale);
		updatePlayers();
		drawPlayers();
		for(i=0;i<birdie_sparks.length;i++){
			birdie_sparks[i].run()
		}
	}
	if (scene3 == true){
		endPage();
	}
}

const dtheta=-0.5;
const r1=60;
const r2=165;
const strength = 40;
const bounce = 20;
var p1_theta, p2_theta;
var birdie_theta = 0;
var birdie_drag_x = 0, birdie_drag_y = 0, birdie_speed = 0;
const air_drag = 0.002;
var p1_hit = false, p2_hit = false;
const collider_len = 50;
function updateBirdie() {
	if (isNaN(birdie_x)) {
		birdie_dx = 0;
		console.log(birdie_dx);
		console.log(isNaN(birdie_dx));
		console.log(isNaN(birdie_x));
		console.log(isNaN(birdie_theta));
		console.log(isNaN(birdie_dx));
		console.log(isNaN(birdie_dx));
	}
	birdie_x += birdie_dx;
	birdie_y += birdie_dy;
	if (birdie_y < 10 && birdie_dy < 0) {
		birdie_dy = 0;
	}
	if (birdie_x < 10) {
		birdie_x = 10;
	}
	if (birdie_x > width - 10) {
		birdie_x = width - 10;
	}
	birdie_drag_x = air_drag * birdie_dx * birdie_dx;
	birdie_drag_y = air_drag * birdie_dy * birdie_dy;
	birdie_theta = atan(birdie_dy/birdie_dx);
	birdie_dx -= (birdie_dx / abs(birdie_dx)) * birdie_drag_x;
	birdie_dy += gravity;
	if (birdie_drag_y < gravity) {
		birdie_dy -= (birdie_dy / abs(birdie_dy)) * birdie_drag_y;
	}
	p1_theta = 2*PI-p1_handR+dtheta
	p2_theta = p2_handR-dtheta
	if (dead) {
	} else {
	if (!p1_hit && intersects(
		p1_x+r1*cos(p1_theta),
		p1_y+r1*sin(p1_theta),
		p1_x+r2*cos(p1_theta),
		p1_y+r2*sin(p1_theta),
		birdie_x-cos(birdie_theta)*collider_len,
		birdie_y-sin(birdie_theta)*collider_len,
		birdie_x+cos(birdie_theta)*collider_len,
		birdie_y+sin(birdie_theta)*collider_len)) {
		birdie_dx = (p1_state == 2 ? strength : bounce) * cos(p1_theta + PI/2);
		birdie_dy = (p1_state == 2 ? strength : bounce) * sin(p1_theta + PI/2);
		p1_hit = true;
		birdie_hit();
		if (isNaN(birdie_dx)) {
			birdie_dx = strength;
		}
		if (isNaN(birdie_dy)) {
			birdie_dy = 0
		}
	}
	if (!p2_hit && intersects(
		p2_x-r1*cos(p2_theta),
		p2_y-r1*sin(p2_theta),
		p2_x-r2*cos(p2_theta),
		p2_y-r2*sin(p2_theta),
		birdie_x-cos(birdie_theta)*collider_len,
		birdie_y-sin(birdie_theta)*collider_len,
		birdie_x+cos(birdie_theta)*collider_len,
		birdie_y+sin(birdie_theta)*collider_len)) {
		birdie_dx = (p2_state == 2 ? strength : bounce) * cos(p2_theta + PI/2);
		birdie_dy = (p2_state == 2 ? strength : bounce) * sin(p2_theta + PI/2);
		if (isNaN(birdie_dx)) {
			birdie_dx = strength;
		}
		if (isNaN(birdie_dy)) {
			birdie_dy = 0
		}
		p2_hit = true;
		birdie_hit();
	}
	}
	if (birdie_y > 700) {
		if (!dead) {
			if (birdie_x < width/2) {
				p2_score++;
			} else {
				p1_score++;
			}
			dead = true;
		}
		if (birdie_dy > 0) {
			if (birdie_dy < 10) {
				birdie_dy = 0;
				birdie_dx *= 0.8;
			}
			if (birdie_dx > -1 && birdie_dx < 1) {
				initGame();
			}
			birdie_dy = -0.6 * birdie_dy;
		}
	}
}

// https://stackoverflow.com/a/24392281/4600414
function intersects(a,b,c,d,p,q,r,s) {
  var det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
	 return false;
  } else {
	 lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
	 gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
	 return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
}

function updatePlayers() {
	if(keyIsDown(87)){
		p1_y-=dino_dy_speed;
	}
	if (keyIsDown(83)){
		p1_y+=dino_dy_speed;
	}
	if (keyIsDown(65)){
		p1_x-=dino_dx_speed;
	}
	if (keyIsDown(68)){
		p1_x+=dino_dx_speed;
	}
	if(keyIsDown(UP_ARROW)){
		p2_y-=dino_dy_speed;
	}
	if (keyIsDown(DOWN_ARROW)){
		p2_y+=dino_dy_speed;
	}
	if (keyIsDown(LEFT_ARROW)){
		p2_x-=dino_dx_speed;
	}
	if (keyIsDown(RIGHT_ARROW)){
		p2_x+=dino_dx_speed;
	}
	p1_handR += p1_state > 0 ? (p1_state == 2 ? dino_hit_vel : dino_return_vel) : 0;
	p2_handR += p2_state > 0 ? (p2_state == 2 ? dino_hit_vel : dino_return_vel) : 0;
	if (p1_handR > dino_rotate_beg) {
		p1_handR = dino_rotate_beg;
	}
	if (p2_handR > dino_rotate_beg) {
		p2_handR = dino_rotate_beg;
	}
	if (keyIsDown(192)){
		p1_state = 2;
		p1_hit = false;
	}
	if (p1_state == 2 && p1_handR <= dino_rotate_end) {
		p1_state = 1;
	} else if (p1_state == 1 && p1_handR >= dino_rotate_beg) {
		p1_state = 0;
	}
	if (keyIsDown(190)){
		p2_state = 2;
		p2_hit = false;
	}
	if (p2_state == 2 && p2_handR <= dino_rotate_end) {
		p2_state = 1;
	} else if (p2_state == 1 && p2_handR >= dino_rotate_beg) {
		p2_state = 0;
	}
	//push();
	//stroke(155, 0, 0);
	//strokeWeight(10);
	//line(
		//p1_x+r1*cos(2*PI-p1_handR+dtheta),
		//p1_y+r1*sin(2*PI-p1_handR+dtheta),
		//p1_x+r2*cos(2*PI-p1_handR+dtheta),
		//p1_y+r2*sin(2*PI-p1_handR+dtheta));
	//line(
		//p2_x-r1*cos(p2_handR-dtheta),
		//p2_y-r1*sin(p2_handR-dtheta),
		//p2_x-r2*cos(p2_handR-dtheta),
		//p2_y-r2*sin(p2_handR-dtheta));
	//line(
		//birdie_x,
		//birdie_y,
		//birdie_x+birdie_dx,
		//birdie_y+birdie_dy,
	//)
	//pop();
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
	//textFont('Courier New');
	text('TIME', 400, 270);
	text('Player 1', 410, 90);
	text('Player 2', 660, 90);
	//time
	if(time <= 60){
		fill(255);
		text(time, width/2, 270);
	}
	textSize(72);
	text(p1_score, 460, 200);
	text(':', 590, 200);
	text(p2_score, 700, 200);
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
	var x, y;
	for (y=0; y < height; y+= 5){
		for (x=0; x < width; x+=5){
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

					line(x_multi * 5	, 142 , x_multi * 5	, 67);
					line(x_multi * -5  , 142 , x_multi * -5  , 67);
					line(x_multi * -15 , 135 , x_multi * -15 , 75);
					line(x_multi * 15  , 135 , x_multi * 15  , 75);

					line(x_multi * 0	, 145 , x_multi * 0	, 65);
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
