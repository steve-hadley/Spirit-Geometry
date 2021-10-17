// Sacred Geometry Generator
// Steve Hadley
// https://vectr.is/links/

// Objects
let circleElements = [];
let lineElements = [];

// Input
let inputs = [];
let inputContainer;
let axisSlider;
let radiusSlider;
let circleDiameterSlider;
let lineLengthSlider;
let lineStepSlider;
let lineGapSlider;
let strokeWeightSlider;

let animate = false;

let timer = 0;

let interval = 4000;

let circleMaxDiameter = 800;

function setup() {
  var canvas = createCanvas();
  canvas.parent('p5js-container');
  colorMode(RGB, 255, 255, 255, 1);

  // Initialize inputs
  initInputs();
  // Calculate canvas size in order to adapt to screen size
  calculateCanvasSize();
  
  noFill();
  stroke(255);
  strokeWeight(3);

  var circleElement = new CircleElement();
  if(animate){
    circleElement.diameter = 0;
  }
  circleElements.push(circleElement);
  var lineElement = new LineElement();
  lineElements.push(lineElement);
}

function draw(){
  // Main loop
  background(0);
  translate(width / 2, height / 2);

  // Animate
  if(animate){
    // Every x seconds
    if(millis() >= interval + timer){
      // Spawn new circle
      var circleElement = new CircleElement();
      circleElement.diameter = 0;
      circleElements.push(circleElement);
      timer = millis();
    }

    for (let i = 0; i < circleElements.length; i++) {
      circleElements[i].expand();
      if(circleElements[i].diameter >= circleMaxDiameter){
        circleElements.splice(i, 1);
      }
    }

  }

  // Display
  circleElements.forEach(circleElement => {
    circleElement.display();
  });

  lineElements.forEach(lineElement => {
    lineElement.display();
  });

}

class CircleElement{
  constructor(){
    this.resize();
  }
  resize(){
    this.axis = GetValue(axisSlider);
    this.step = TWO_PI / this.axis;
    this.diameter = GetValue(circleDiameterSlider);
    this.radius = GetValue(radiusSlider);
    this.alpha = 1;
  }
  expand(){
    this.diameter += 1;
  }
  reset(){
    this.diameter = 0;
  }
  display(){
    let alpha = 1.0 - (this.diameter / circleMaxDiameter);
    stroke(255, 255, 255, alpha);
    // Draw center circle
    circle(0, 0, this.diameter);
    // Angle to rotate by
    this.theta = 0;
    let pos = createVector();
    // Rotate as per axis count, incrementing the angle by the chosen step size
    for (let i = 0; i < this.axis; i++) {
      this.theta += this.step;
      // Polar to cartesian coordinate conversion
      pos.x = this.radius * cos(this.theta);
      pos.y = this.radius * sin(this.theta);
      // Draw circle
      circle(pos.x, pos.y, this.diameter);
    }
  }
}

class LineElement{
  constructor(){
    this.resize();
  }
  resize(){
    this.length = GetValue(lineLengthSlider);
    this.outerStep = GetValue(lineStepSlider);
    this.innerStep = GetValue(lineGapSlider);
  }
  display(){
    // Rotate by the chosen step
    for (let a = 0; a < 360; a += this.outerStep){
      push();
      rotate(radians(a));
      // Draw lines in a wave pattern with a variable dispersion
      for (let r = 0; r < 180; r += this.innerStep) {
        // Rad method of creating line lengths in a wave pattern, inspired by https://linktr.ee/thedotiswhite
        stroke(255, 255, 255, 1);
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

function GetValue(input){
  return parseInt(input.value);
}

function initInputs(){
  inputContainer = document.getElementById('controls');
  axisSlider = inputContainer.querySelector('#axisSlider');
  radiusSlider = inputContainer.querySelector('#radiusSlider');
  circleDiameterSlider = inputContainer.querySelector('#circleDiameterSlider');
  lineLengthSlider = inputContainer.querySelector('#lineLengthSlider');
  lineStepSlider = inputContainer.querySelector('#lineStepSlider');
  lineGapSlider = inputContainer.querySelector('#lineGapSlider');
  strokeWeightSlider = inputContainer.querySelector('#strokeWeightSlider');

  axisSlider.value = 6;
  circleDiameterSlider.value = 100;
  lineStepSlider.value = 30;
  lineGapSlider.value = 30;
  strokeWeightSlider.value = 2;

  if(windowWidth <= 1280){
    lineLengthSlider.value = 130;
    radiusSlider.value = 100;
    radiusSlider.max = 200;
    lineLengthSlider.max = 200;
  } else {
    lineLengthSlider.value = 400;
    radiusSlider.value = 200;
    radiusSlider.max = 500;
  }

  // Hook up inputs
  inputs = inputContainer.getElementsByTagName('input');
  updateInputs();
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    input.oninput = function(){
      processInput(input);
    }
  }

  let animationToggle = inputContainer.querySelector('#animationToggle');
  animationToggle.addEventListener('change', function() {
    animate = this.checked;
  });

  animate = animationToggle.checked;

  inputContainer.querySelector('#export-button').onclick = (function () {
    Export();
  })

  inputContainer.querySelector('#randomize-button').onclick = (function () {
    randomize();
  })
}

function randomize(){
  inputs.forEach(input => {
    input.value = parseInt(random(input.min, input.max));
  });
  updateInputs();
}

function updateInputs(){
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    processInput(input);
  }
}

function processInput(input){
  // Update outputs
  let output = inputContainer.querySelector('#' + input.id + 'Output');
  output.value = input.value;
  // Resize elements
  circleElements.forEach(element => {
    element.resize();
  }); 
  lineElements.forEach(element => {
    element.resize();
  });
  // Update stroke weight
  strokeWeight(GetValue(strokeWeightSlider));
}

function windowResized() {
  calculateCanvasSize();
}

function calculateCanvasSize(){
  if(windowWidth <= 1280){
    resizeCanvas(windowWidth, windowHeight / 2);
  } else {
    resizeCanvas(windowWidth, windowHeight - 100);
  }
}