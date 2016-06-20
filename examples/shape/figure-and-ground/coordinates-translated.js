function setup() {

  createCanvas(600, 450);
  background(255, 255, 220);

  // Here we move the coordinate system by using translate. We draw
  // the rectangle at 0,0 because the coordinate system has moved to the
  // point where we want to draw the rectangle.
  var x = width / 3;
  var y = height / 3;
  var s = height / 3;

  translate(x, y);
  noStroke();
  fill(255, 255, 170);
  rect(0, 0, width, height);
  fill(40);
  rect(0, 0, s, s);

  noLoop();
}
