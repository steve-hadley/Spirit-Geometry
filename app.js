// Sacred Geometry Generator
// @Vectris
// https://vectr.is/

let rotationStep;
let points = [];

// Animation
let animate = false;
let speed = 0;
let timer = 0;
let frequency = 0;
let circleMaxDiameter;
let overshoot;

let time = 0;

let guiElements = {
  innerRadius: 100,
  axisCount: 8,
  outerRadius: 100,
  bloom: 10,
  lineThickness: 2,
  randomize:function(){ Randomize();},
  capture:function(){ Export();}
}
let gui = new dat.GUI();
let lineColour;

function setup() {
  var canvas = createCanvas();
  canvas.parent('p5js-container');

  colorMode(HSL, 1);

  // Calculate canvas size in order to adapt to screen size
  calculateCanvasSize();
  
  noFill();

  background(0);
  // createLoop({duration:10, gif:true})
  angleMode(DEGREES);
  noFill();
  lineColour = color(1,1,1);
  stroke(lineColour);
  strokeWeight(guiElements.lineThickness);

  generatePoints();

  gui.add(guiElements, 'randomize');
  gui.add(guiElements, 'axisCount', 3, 10, 1).listen();
  gui.add(guiElements, 'innerRadius', 0, 255).listen();
  gui.add(guiElements, 'outerRadius', 0, 255).listen();
  gui.add(guiElements, 'bloom', 0, 100).listen();
  gui.add(guiElements, 'lineThickness', 1, 5).listen();
  gui.add(guiElements, 'capture');
}

function convertColour(color){
  return RGBToHSL(color[0], color[1], color[2]);
}

function draw(){
  background(0);

  drawingContext.shadowBlur = guiElements.bloom;
  drawingContext.shadowColor = lineColour;

  lineColour = color(map(sin(time), -1, 1, 0, 1), 1, 0.5);
  stroke(lineColour);
  strokeWeight(guiElements.lineThickness);

  translate(width / 2, height / 2);

  rotationStep = 360 / guiElements.axisCount;

  generatePoints();

  drawPoints();

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

  time += deltaTime * 0.01;
}

function generatePoints(){
  points = [];
  // Generate points
  let theta = 0;
  for (let i = 0; i < guiElements.axisCount; i++) {
    let x = sin(theta) * guiElements.innerRadius;
    let y = cos(theta) * guiElements.innerRadius;
    points.push({x,y});
    point(x, y);
    theta += rotationStep;
  }
}

function drawPoints(){
    // Draw ellipses at points
    for (let i = 0; i < points.length; i++) {
      let point = points[i];
      ellipse(point.x, point.y, guiElements.outerRadius * 2)
    }
  
    // Draw lines between points
    for (let i = 0; i < points.length; i++) {
      for (let j = 0; j < points.length; j++) {
        let point1 = points[i];
        let point2 = points[j];
        line(point1.x, point1.y, point2.x, point2.y);
        // gradientLine(point1.x, point1.y, point2.x, point2.y, "blue", "purple")
      }    
    }
}

// Save image
function Export() {
  var d = new Date();
  saveCanvas('Export' + d.getDate() + d.getMonth() + d.getFullYear() + d.getHours() + d.getMinutes() + d.getSeconds(), 'jpg');
}

function Randomize(){
  for (let i = 0; i < gui.__controllers.length; i++) {
    const element = gui.__controllers[i];
    if(element.hasOwnProperty('__max')){
      guiElements[element.property] = parseInt(getRandomArbitrary(element.__min, element.__max));
    }
    time = parseInt(getRandomArbitrary(0, 10000));
  }
}

function windowResized() {
  calculateCanvasSize();
}

function calculateCanvasSize(){
  if(windowWidth <= 1280){
    resizeCanvas(windowWidth, windowWidth);
  } else {
    resizeCanvas(windowHeight, windowHeight);
  }
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

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function RGBToHSL(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return [ h, s, l ];
}

