var vertexAnchor;
var bezierControlPoint1;
var bezierControlPoint2;
var bezierAnchor;

var lineSize;
var dotSize;

function setup()
{
  createCanvas(600, 450);
  frameRate(36);

  var w = width * 0.65;
  var h = height * 0.60;
  var shift = width * 0.1;
  var x = (width/2) - (w/2) + (shift/2);
  var y = (height/2) - (h/2);

  lineSize = width * 0.005;
  dotSize = width * 0.015;

  vertexAnchor = createVector(x, y+h);
  bezierAnchor = createVector(x+w, y+h);
  bezierControlPoint1 = createVector(x-shift, y);
  bezierControlPoint2 = createVector(x+w-shift, y);
}

function draw()
{
  background(240);

  var percent = frameCount % 100 / 100;

  // draw bezier line
  strokeWeight(lineSize);
  stroke(30);
  noFill();
  beginShape();
  vertex(vertexAnchor.x, vertexAnchor.y);
  bezierVertex(bezierControlPoint1.x, bezierControlPoint1.y, bezierControlPoint2.x, bezierControlPoint2.y, bezierAnchor.x, bezierAnchor.y);
  endShape();

  // draw dots in between
  var pointBetween1 = drawDotBetween(vertexAnchor, bezierControlPoint1, percent, '#E1B000', dotSize);
  var pointBetween2 = drawDotBetween(bezierControlPoint1, bezierControlPoint2, percent, '#E1B000', dotSize);
  var pointBetween3 = drawDotBetween(bezierControlPoint2, bezierAnchor, percent, '#E1B000', dotSize);
  var pointBetween4 = drawDotBetween(pointBetween1, pointBetween2, percent, '#E1B000', dotSize);
  var pointBetween5 = drawDotBetween(pointBetween2, pointBetween3, percent, '#E1B000', dotSize);
  var pointBetween6 = drawDotBetween(pointBetween4, pointBetween5, percent, '#c64821', dotSize*1.5);

  // draw anchor points
  noStroke();
  fill('#E1B000');
  ellipse(vertexAnchor.x, vertexAnchor.y, dotSize, dotSize);
  ellipse(bezierAnchor.x, bezierAnchor.y, dotSize, dotSize);

  // draw control points
  noStroke();
  fill('#E1B000');
  ellipse(bezierControlPoint1.x, bezierControlPoint1.y, dotSize, dotSize);
  ellipse(bezierControlPoint2.x, bezierControlPoint2.y, dotSize, dotSize);
}

function drawDotBetween(start, stop, percent, col, s)
{
  var pointBetween = p5.Vector.lerp(start, stop, percent);

  // draw line
  stroke('#FFDAA2');
  strokeWeight(lineSize/2);
  line(start.x, start.y, stop.x, stop.y);

  // draw dot
  noStroke();
  fill(col);
  ellipse(pointBetween.x, pointBetween.y, s, s);

  return pointBetween;
}
