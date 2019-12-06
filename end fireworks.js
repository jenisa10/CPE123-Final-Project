// Example of very simple particle systems - introduction to objects in javascript

// define a single particle
function end_Particle(x , y) // you will need to modify the parameters
{
   // the data associated with a particle
   this.accelY = 0.05; //gravity
   this.velX = random(-1, 1);
   this.velY = random(.5, 1.3);

   // note this particle only can vary its blue color 
   // - change this to include red and green
   if(col % 3 < 1){
      this.pcolorR=255
      this.pcolorG=166+random(-50,50)
      this.pcolorB=247+random(-50,50)
   }
   else if(col % 3 < 2){
      this.pcolorR=145+random(-50,50)
      this.pcolorG=255
      this.pcolorB=176+random(-50,50)
   }
   else if(col % 3 < 3){
      this.pcolorR=145+random(-50,50)
      this.pcolorG=255+random(-50,50)
      this.pcolorB=255
   }
   this.locX = x;
   this.locY = y;
   this.r = 8.0;
   this.life = 255;
  
   // a function to update the particle each frame
   this.updateP = function()
   {
      this.velY += this.accelY;
      this.locX += this.velX;
      this.locY += this.velY;
      this.life -= 2.5;
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
} //end of particle object definition


// define a group of particles as a particleSys
function end_PSys(sX, sY, num)
{
   // the data - lots of particles
   this.particles = [];
   for (var i=0; i < num; i++) 
   {
      this.particles.push(new end_Particle(sX, sY));
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

// declare of a variable to represent a particle system
var fireW1; 
var fireworks = [];
var col = 1;

function setup() 
{
   createCanvas(500, 500);

   // start a new particle system
   //fireW1 = new PSys(200, 100, 20);
}

function draw() 
{
   background(0);

   // run the particle system
   for(i=0;i<fireworks.length;i++){
      fireworks[i].run()
   }
   //fireW1.run(); 
}

function endFireworks(){
   fireworks.push(new PSys(random(width), random(height), random(15, 25)));
   col++
}