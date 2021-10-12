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

var controls;

function setup() {
  var canvas = createCanvas();
  calculateCanvasSize();
  canvas.parent('p5js-container');
  controls = document.getElementById('controls');
  document.getElementById('export-button').onclick = (function () {
    Export();
  })
  noFill();
  stroke(255);
  strokeWeight(3);
  radius = startRadius;
  circleDiameter = startCircleDiameter;
}

function draw(){
  background(0);

  step = TWO_PI / axis;
  axis = controls.querySelector('#axis-slider').value;
  circleDiameter = controls.querySelector('#circle-diameter-slider').value;
  radius = controls.querySelector('#radius-slider').value;
  lineLength = controls.querySelector('#line-length-slider').value;

  translate(width / 2, height / 2);
  theta = 0;

  // Flower
  circle(0, 0, 200);
  let circlePos = createVector();
  for (let i = 0; i < axis; i++) {
    theta += step;
    // Polar to cartesian coordinate conversion
    circlePos.x = radius * cos(theta);
    circlePos.y = radius * sin(theta);
    circle(circlePos.x, circlePos.y, circleDiameter);
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
function Export() {
  saveCanvas('Export', 'jpg');
}

function windowResized() {
  calculateCanvasSize();
}

function calculateCanvasSize(){
  if(windowWidth < 1600){
    resizeCanvas(windowWidth, windowHeight);
  } else {
    resizeCanvas(windowWidth / 2, windowHeight);
  }
}