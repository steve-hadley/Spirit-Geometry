let circleElement;
let lineElement;

let controls;
let axisSlider;
let radiusSlider;
let circleDiameterSlider;
let lineLengthSlider;
let lineStepSlider;

function setup() {
  controls = document.getElementById('controls');

  var canvas = createCanvas();
  calculateCanvasSize();
  setDefaults();
  canvas.parent('p5js-container');
  
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
  strokeWeight(parseInt(GetInputValue('#stroke-weight-slider')));
  circleElement.resize();
  circleElement.display();
  lineElement.resize();
  lineElement.display();
}

function setDefaults(){
  SetInputValue('#axis-slider', 6);
  SetInputValue('#circle-diameter-slider', 100);
  SetInputValue('#line-step-slider', 30);
  SetInputValue('#line-gap-slider', 30);
  SetInputValue('#stroke-weight-slider', 2);

  if(windowWidth < 820){
    SetInputValue('#line-length-slider', 200);
    SetInputValue('#radius-slider', 100);
    GetInput('#radius-slider').max = 200;
    GetInput('#line-length-slider').max = 400;
  } else {
    SetInputValue('#line-length-slider', 400);
    SetInputValue('#radius-slider', 200);
    GetInput('#radius-slider').max = 500;
  }
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
    this.axis = GetInputValue('#axis-slider');
    this.step = TWO_PI / this.axis;
    this.diameter = GetInputValue('#circle-diameter-slider');
    this.radius = GetInputValue('#radius-slider');
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
    this.length = GetInputValue('#line-length-slider');
    this.step = GetInputValue('#line-step-slider');
    this.gap = GetInputValue('#line-gap-slider');
  }
  display(){
    for (let a = 0; a < 360; a += this.step){
      push();
      rotate(radians(a));
      for (let r = 0; r < 180; r += this.gap) {
        // Rad method of creating line lengths in a wave pattern, inspired by https://linktr.ee/thedotiswhite
        line(sin(radians(r)) * this.length, cos(radians(r)) * this.length, sin(radians(-r)) * this.length, cos(radians(-r)) * this.length);
      }
      pop();  
    }
  }
}

// Save image
function Export() {
  saveCanvas('Export', 'jpg');
}

function SetInputValue(id, value){
  controls.querySelector(id).value = value;
  controls.querySelector(id).oninput();
}

function GetInput(id){
  return controls.querySelector(id);
}

function GetInputValue(id){
  return parseInt(controls.querySelector(id).value);
}

function windowResized() {
  calculateCanvasSize();
}

function calculateCanvasSize(){
  resizeCanvas(windowWidth, windowHeight);
}