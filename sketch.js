let theta = 0;
let axis = 6;
let step;

// Circles
let startRadius = 100;
let radius;
let startCircleDiameter = 200;
let circleDiameter;

// Lines
let lineLength = 400;
let lineStep = 30;


let axisSlider;
let radiusSlider;
let circleDiameterSlider;
let lineLengthSlider;
let lineStepSlider;

function setup() {
  createCanvas(windowWidth / 2, windowHeight);
  noFill();
  stroke(255);
  strokeWeight(3);
  radius = startRadius;
  circleDiameter = startCircleDiameter;
  axisSlider = createSlider(6, 30, 6);
  axisSlider.position(10, 10);
  radiusSlider = createSlider(10, width / 2, 100);
  radiusSlider.position(10, 40);
  circleDiameterSlider = createSlider(50, width / 2, 200);
  circleDiameterSlider.position(10, 70);
  lineLengthSlider = createSlider(100, 600, 400);
  lineLengthSlider.position(10, 100);
  lineStepSlider = createSlider(10, 100, 30);
  lineStepSlider.position(10, 130);
}

function draw(){
  background(0);

  step = TWO_PI / axis;
  axis = axisSlider.value();
  circleDiameter = circleDiameterSlider.value();
  radius = radiusSlider.value();
  lineLength = lineLengthSlider.value();
  lineStep = lineStepSlider.value();


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

  // Lines
  for (let a = 0; a < 360; a += lineStep){
    push();
    rotate(radians(a));
    for (let r = 0; r < 180; r += lineStep) {
      line(sin(radians(r)) * lineLength, cos(radians(r)) * lineLength, sin(radians(-r)) * lineLength, cos(radians(-r)) * lineLength);
    }
    pop();  
  }
}

// Save image
function keyPressed() {
  if (keyCode === ENTER) {
    saveCanvas('Sacred-Geometry', 'jpg');
  }
}