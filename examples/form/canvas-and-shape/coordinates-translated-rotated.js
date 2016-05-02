function setup() {

  createCanvas(600, 450);
  background(255, 255, 220);

  // By translating before rotating, the rectangle now rotates around its
  // top left corner.
  var x = width / 3;
  var y = height / 3;
  var s = height / 3;

  translate(x, y);
  rotate(radians(10));
  noStroke();
  fill(255, 255, 170);
  rect(0, 0, width, height);
  fill(40);
  rect(0, 0, s, s);

  noLoop();
}
