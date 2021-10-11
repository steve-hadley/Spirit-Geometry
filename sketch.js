let theta = 0;
let axis = 6;
let step;
let rotation = 0;

let startRadius = 100;
let radius;
let startCircleDiameter = 200;
let circleDiameter;

let expanding = true;

let slider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  stroke(255);
  strokeWeight(3);
  radius = startRadius;
  circleDiameter = startCircleDiameter;
  slider = createSlider(6, 30, 6);
  slider.position(10, 10);
  slider.style('width', '80px');
}

function draw(){
  background(0);

  let sliderValue = slider.value();
  axis = sliderValue;
  step = TWO_PI / axis;

  // Expand and contract
  if(circleDiameter > height / 2 || circleDiameter > width / 2 || circleDiameter < startCircleDiameter){
    expanding =! expanding;
  }
  
  if(expanding){
    circleDiameter += 1;
    radius += 0.5;
  } else {
    circleDiameter -= 1;
    radius -= 0.5;
  }

  // Rotate
  rotation += 0.002;

  // Flower
  translate(width / 2, height / 2);
  circle(0, 0, 200);
  let circlePos = createVector();
  for (let i = 0; i < axis; i++) {
    theta += step;
    // Polar to cartesian coordinate conversion
    circlePos.x = radius * cos(theta);
    circlePos.y = radius * sin(theta);
    circle(circlePos.x, circlePos.y, circleDiameter);
  }

  // Flower center
  theta = 0;
  let lineStart = createVector();
  let lineEnd = createVector();
  for (let i = 0; i < axis; i++) {
    theta += step;
    lineStart.x = radius * cos(theta);
    lineStart.y = radius * sin(theta);
    line(lineStart.x, lineStart.y, lineEnd.x, lineEnd.y);
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    saveCanvas('Sacred-Geometry', 'jpg');
  }
}