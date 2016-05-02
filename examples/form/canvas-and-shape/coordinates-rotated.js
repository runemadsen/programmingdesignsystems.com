function setup() {

  createCanvas(600, 450);
  background(255, 255, 220);

  // Here we rotate the coordinate system. This affects the rectangle
  // because all shapes belong to the coordinate system.
  var x = width / 3;
  var y = height / 3;
  var s = height / 3;

  rotate(radians(10));
  noStroke();
  fill(255, 255, 170);
  rect(0, 0, width, height);
  fill(40);
  rect(x, y, s, s);

  noLoop();
}
