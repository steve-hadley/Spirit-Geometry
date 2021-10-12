var circleElement;
var lineElement;

var controls;
let axisSlider;
let radiusSlider;
let circleDiameterSlider;
let lineLengthSlider;
let lineStepSlider;

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

  circleElement = new CircleElement();
  lineElement = new LineElement();
}

function draw(){
  background(0);
  translate(width / 2, height / 2);
  circleElement.resize();
  circleElement.display();
  lineElement.resize();
  lineElement.display();
}

class CircleElement{
  constructor(){
    this.theta = 0;
    this.axis = 6;
    this.step = TWO_PI / this.axis;
    this.radius;
    this.diameter;
  }
  resize(){
    this.axis = GetInput('#axis-slider');
    this.step = TWO_PI / this.axis;
    this.diameter = GetInput('#circle-diameter-slider');
    this.radius = GetInput('#radius-slider');
  }
  display(){
    this.theta = 0;
    circle(0, 0, 200);
    let pos = createVector();
    for (let i = 0; i < this.axis; i++) {
      this.theta += this.step;
      // Polar to cartesian coordinate conversion
      pos.x = this.radius * cos(this.theta);
      pos.y = this.radius * sin(this.theta);
      circle(pos.x, pos.y, this.diameter);
    }
  }
}

class LineElement{
  constructor(){
    this.length = 300;
    this.step = 40;
    this.gap = 40;
  }
  resize(){
    this.length = GetInput('#line-length-slider');
    this.step = GetInput('#line-step-slider');
    this.gap = GetInput('#line-gap-slider');
  }
  display(){
    for (let a = 0; a < 360; a += this.step){
      push();
      rotate(radians(a));
      for (let r = 0; r < 180; r += this.gap) {
        line(sin(radians(r)) * this.length, cos(radians(r)) * this.length, sin(radians(-r)) * this.length, cos(radians(-r)) * this.length);
      }
      pop();  
    }
  }
}

function GetInput(id){
  return parseInt(controls.querySelector(id).value);
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