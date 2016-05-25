function setup() {

  createCanvas(600, 450);
  background(255, 255, 220);

  noStroke();
  fill(255, 255, 170);
  rect(0, 0, width, height);
  fill(40);

  // In this example, the coordinate system is not rotated, so the rectangle
  // is simply drawn at the specified location.
  var x = width / 3;
  var y = height / 3;
  var s = height / 3;
  
  rect(x, y, s, s);

  noLoop();
}
