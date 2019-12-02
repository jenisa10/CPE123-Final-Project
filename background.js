var scene1;
var scene2;
var scene3;
var time = 60;

function setup(){
    createCanvas(1200, 800); 
    scene1 = true;
    scene2 = false;
    scene3 = false; 
    //setInterval(timer, 1000);
    grass_initialize();
}

function draw(){ 
    if (scene1 == true) {
        title(); 
    }
    if (scene2 == true) {
        back();
        grass();
        court();
        board();
        timer();
        //noLoop(); need to fix loop of grass
    } 
    if (scene3 == true){
        endPage();
    }
}

function back(){
    fill(180, 220, 255);
    rect(0, 0, 1200, 800);
    var color1 = color(0, 140, 200);
    var color2 = color(255, 165, 200);
    setGradient(0, 0, width, 500, color1, color2, "Y");
    fill(100);
    rect(1050, 0, 150, 50);
    fill(100);
    rect(0, 0, 150, 50);
    fill(255);
    text('HOME', 25, 40);
    text('END', 1090, 40);
}

function court(){
    // noStroke();
    // fill(150, 230, 150);
    // rect(0, 470, width, height);
    //fill(255, 182, 255);
    strokeWeight(8);
    stroke(255);
    fill(255, 182, 180);
    quad(50, 750, 100, 500, 1100, 500, 1150, 750); 
    stroke(255);
    strokeWeight(5);
    line(70, 750, 120, 500);
    line(1080, 500, 1130, 750);
    line(95, 520, 1105, 520);
    line(55, 730, 1145, 730);
    // line(75, 625, 475, 625);
    // line(750, 625, 1120, 625);
    line(450, 500, 425, 750);
    line(750, 500, 775, 750);
    line(440, 625, 760, 625);
    strokeWeight(12);
    stroke(150);
    line(600, 500, 600, 440);
    strokeWeight(5);
    stroke(180);
    line(600, 445, 600, 675);
    stroke(150);
    strokeWeight(12);
    line(600, 750, 600, 680);
    // strokeWeight(5);
    // line(500, 450, 520, 530);
}

function board(){
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

var grass_g=[];
var grass_b=[];
var grass_x=[];
var grass_y=[];
var grass_dx=[];
var grass_dy=[];
function grass(){
    /*for (var y=0; y < height; y+= 5){
		for (var x=0; x < width; x+=5){
            if  (impl_line(x, y, 0, 470, 1200, 470) > 0){
                noStroke();
                fill(50, grass_g[y*width+x], grass_b[y*width+x]);
                ellipse(x + (random(-2, 2)), y + (random(-5, 5)), 5, 30);
            }
            else{
                noFill();
            }
        }
    }*/
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

function stand(){
    stroke(170);
    fill(190);
    quad(100, 340, 1100, 340, 1050, 460, 150, 460);
    rect(140, 450, 910, 10);

}

function endPage(){
    background(120, 180, 150);
    fill(255);
    textFont('Courier New');
    textSize(100);
    text('CONGRATULATIONS', 150, 100);
    textSize(50);
    text('Thank you for playing the game.', 100, 210);
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