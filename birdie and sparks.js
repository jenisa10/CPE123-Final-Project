// declare of a variable to represent a particle system
var fireW1; 
var fireworks = [];
var fcol = 1;
var bpx;
var bpy;

//var birdie_dir = [];
//var birdie_sc;
//var birdie_theta = [];
//var birdie_thetaAdd = [];

function setup() 
{
	createCanvas(500, 500);
}

function draw() 
{
	bpx = mouseX;
	bpy = mouseY;
	background(150);
	for(i=0;i<fireworks.length;i++){
		fireworks[i].run()
	}

	birdie(width/2, height/2, 4, 3, 1)
}
//definition of a particle
function Particle(x , y)
{
	this.accelY = 0.01; //gravity
	this.velX = random(.5, 1.3);
	this.velY = random(-.5, .5);

	if(fcol == 1){
		this.pcolorR=255
		this.pcolorG=243+random(-50,50)
		this.pcolorB=95+random(-50,50)
	}
	else if(fcol % 3 < 1){
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
	this.r = 8.0;
	this.life = 80;
	// a function to update the particle each frame
	this.updateP = function()
	{
		this.velY += this.accelY;
		this.locX += this.velX;
		this.locY += this.velY;
		this.life -= 1;
	};
	// function to draw a particle
	this.renderP = function() 
	{
		noStroke();
		push();
			fill(this.pcolorR, this.pcolorG, this.pcolorB, this.life);
			translate(this.locX, this.locY);
			ellipse(0, 0, this.r, this.r);
		pop();
	};
}


// define a group of particles as a particleSys
function PSys(sX, sY, num)
{
	// the data - lots of particles
	this.particles = [];
	for (var i=0; i < num; i++) 
	{
		this.particles.push(new Particle(sX, sY));
	}
	// function defining what to do each frame
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


function hit(){
	fireworks.push(new PSys(bpx, bpy, random(15, 25)));
}

function endFireworks(){
	fcol++
	fireworks.push(new PSys(random(width), random(height), random(25, 30)));
}

function mouseClicked(){
	hit();
	//winScreen();
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
