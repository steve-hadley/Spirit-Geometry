// Sacred Geometry Generator
// @Vectris
// https://vectr.is/

let rotationSegments = 8;
let rotationStep;

let radius;
let points = [];

// Animation
let animate = false;
let speed = 0;
let timer = 0;
let frequency = 0;
let circleMaxDiameter;
let overshoot;

// Input
let inputs = [];
let inputContainer;
let axisSlider;
let radiusSlider;
let circleDiameterSlider;
let lineLengthSlider;
let lineOuterStepSlider;
let lineInnerStepSlider;
let strokeWeightSlider;
let speedSlider;
let frequencySlider;

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

  background(0);
  radius = 100;
  colorMode(HSB, 1);
  // createLoop({duration:10, gif:true})
  angleMode(DEGREES);
  noFill();
  stroke(1);
  strokeWeight(3);
  
  rotationStep = 360 / rotationSegments;

  translate(width / 2, height / 2);

  // Generate points
  let theta = 0;
  for (let i = 0; i < rotationSegments; i++) {
    let x = sin(theta) * radius;
    let y = cos(theta) * radius;
    points.push({x,y});
    point(x, y);
    theta += rotationStep;
  }

  // Draw ellipses at points
  for (let i = 0; i < points.length; i++) {
    let point = points[i];
    ellipse(point.x, point.y, 400)
  }

  // Draw lines between points
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points.length; j++) {
      let point1 = points[i];
      let point2 = points[j];
      line(point1.x, point1.y, point2.x, point2.y);
      gradientLine(point1.x, point1.y, point2.x, point2.y, "blue", "purple")
    }    
  }

}

function draw(){
  // Main loop
  // background(0);
  // translate(width / 2, height / 2);

  // drawingContext.shadowBlur = 30;
  // drawingContext.shadowColor = color(255, 255, 255);

  // Animate
  // if(animate){
  //   // Every x seconds
  //   if(millis() >= frequency + timer){
  //     // Spawn new circle
  //     var circleElement = new CircleElement();
  //     circleElement.diameter = 0;
  //     circleElements.push(circleElement);
  //     timer = millis();
  //   }
  //   // Animate current circles
  //   for (let i = 0; i < circleElements.length; i++) {
  //     circleElements[i].expand();
  //     // Remove dead circles
  //     if(circleElements[i].diameter >= circleMaxDiameter){
  //       circleElements.splice(i, 1);
  //     }
  //   }
  // }
}


// Save image
function Export() {
  var d = new Date();
  saveCanvas('Export' + d.getDate() + d.getMonth() + d.getFullYear() + d.getHours() + d.getMinutes() + d.getSeconds(), 'jpg');
}

function GetValue(input){
  return parseInt(input.value);
}

function randomizeInputs(){
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

  // Update stroke weight
  strokeWeight(GetValue(strokeWeightSlider));

  // Update speed
  speed = GetValue(speedSlider);
  frequency = (parseInt(frequencySlider.max) + 1 - GetValue(frequencySlider)) * 1000;
  timer = frequency;
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

function initInputs(){
  inputContainer = document.getElementById('controls');
  axisSlider = inputContainer.querySelector('#axisSlider');
  radiusSlider = inputContainer.querySelector('#radiusSlider');
  circleDiameterSlider = inputContainer.querySelector('#circleDiameterSlider');
  lineLengthSlider = inputContainer.querySelector('#lineLengthSlider');
  lineOuterStepSlider = inputContainer.querySelector('#lineStepSlider');
  lineInnerStepSlider = inputContainer.querySelector('#lineGapSlider');
  strokeWeightSlider = inputContainer.querySelector('#strokeWeightSlider');
  speedSlider = inputContainer.querySelector('#speedSlider');
  frequencySlider = inputContainer.querySelector('#frequencySlider');

  axisSlider.value = 6;
  circleDiameterSlider.value = 100;
  lineOuterStepSlider.value = 30;
  lineInnerStepSlider.value = 30;
  strokeWeightSlider.value = 2;

  if(windowWidth <= 1280){
    lineLengthSlider.value = 130;
    radiusSlider.value = 100;
    radiusSlider.max = 200;
    lineLengthSlider.max = 200;
    circleDiameterSlider.max = 300;
    overshoot = 150;
  } else {
    lineLengthSlider.value = 400;
    radiusSlider.value = 200;
    radiusSlider.max = 500;
    circleDiameterSlider.max = 500;
    overshoot = 250;
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
    var animationControls = inputContainer.querySelector('#animation-controls');
    if(animate){
      animationControls.style.display = "block";
    } else {
      animationControls.style.display = "none";
    }
  });

  animate = animationToggle.checked;

  circleMaxDiameter = parseInt(circleDiameterSlider.max) + overshoot;

  inputContainer.querySelector('#export-button').onclick = (function () {
    Export();
  })

  inputContainer.querySelector('#randomize-button').onclick = (function () {
    randomizeInputs();
  })
}

function gradientLine(x1, y1, x2, y2, color1, color2) {
  // linear gradient from start to end of line
  var grad = this.drawingContext.createLinearGradient(x1, y1, x2, y2);
  grad.addColorStop(0, color1);
  grad.addColorStop(1, color2);

  this.drawingContext.strokeStyle = grad;

  line(x1, y1, x2, y2);
  ellipse(point.x, point.y, 400)
}