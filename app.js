let circleElement;
let lineElement;

let controlsContainer;
let axisSlider;
let radiusSlider;
let circleDiameterSlider;
let lineLengthSlider;
let lineStepSlider;

function setup() {
  controlsContainer = document.getElementById('controls');

  var canvas = createCanvas();
  canvas.parent('p5js-container');
  calculateCanvasSize();
  setDefaults();

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

  if(windowWidth <= 1280){
    SetInputValue('#line-length-slider', 130);
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
    this.resize();
  }
  resize(){
    this.axis = GetInputValue('#axis-slider');
    this.step = TWO_PI / this.axis;
    this.diameter = GetInputValue('#circle-diameter-slider');
    this.radius = GetInputValue('#radius-slider');
  }
  display(){
    this.theta = 0;
    circle(0, 0, this.diameter);
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
    this.resize();
  }
  resize(){
    this.length = GetInputValue('#line-length-slider');
    this.outerStep = GetInputValue('#line-step-slider');
    this.innerStep = GetInputValue('#line-gap-slider');
  }
  display(){
    for (let a = 0; a < 360; a += this.outerStep){
      push();
      rotate(radians(a));
      for (let r = 0; r < 180; r += this.innerStep) {
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
  controlsContainer.querySelector(id).value = value;
  controlsContainer.querySelector(id).oninput();
}

function GetInput(id){
  return controlsContainer.querySelector(id);
}

function GetInputValue(id){
  return parseInt(controlsContainer.querySelector(id).value);
}

function windowResized() {
  calculateCanvasSize();
}

function calculateCanvasSize(){
  if(windowWidth <= 1280){
    resizeCanvas(windowWidth, windowHeight / 2);
  } else {
    resizeCanvas(windowWidth, windowHeight);
  }
}