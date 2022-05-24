// Sacred Geometry Generator
// @Vectris
// https://vectr.is/

let variables = {
  radius: 100,
  axisCount: 8,
  circleRadius: 100,
  export:function(){ Export();}
}

let axisStep;
let points = [];

// Animation
let animate = false;
let speed = 0;
let timer = 0;
let frequency = 0;
let circleMaxDiameter;
let overshoot;

let gui = new dat.GUI();

function setup() {
  var canvas = createCanvas();
  canvas.parent('p5js-container');
  colorMode(RGB, 255, 255, 255, 1);

  gui.add(variables, 'radius', 0, 255);
  gui.add(variables, 'axisCount', 3, 10, 1);
  gui.add(variables, 'circleRadius', 0, 255);
  gui.add(variables, 'export');

  // Calculate canvas size in order to adapt to screen size
  calculateCanvasSize();
  
  noFill();
  stroke(255);
  strokeWeight(3);

  background(0);
  colorMode(HSB, 1);
  // createLoop({duration:10, gif:true})
  angleMode(DEGREES);
  noFill();
  stroke(1);
  strokeWeight(3);

  generatePoints();
}

function draw(){
  background(0);

  translate(width / 2, height / 2);

  axisStep = 360 / variables.axisCount;

  generatePoints();

  drawPoints();

  // Main loop
  drawingContext.shadowBlur = 100;
  drawingContext.shadowColor = color(255, 255, 255);

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

function generatePoints(){
  points = [];
  // Generate points
  let theta = 0;
  for (let i = 0; i < variables.axisCount; i++) {
    let x = sin(theta) * variables.radius;
    let y = cos(theta) * variables.radius;
    points.push({x,y});
    point(x, y);
    theta += axisStep;
  }
}

function drawPoints(){
    // Draw ellipses at points
    for (let i = 0; i < points.length; i++) {
      let point = points[i];
      ellipse(point.x, point.y, variables.circleRadius * 2)
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