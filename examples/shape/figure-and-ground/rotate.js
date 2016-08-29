function setup() {

  createCanvas(600, 350);
  background(255, 255, 220);
  noStroke();

  var size = height / 3;
  var margin = width / 20;
  var x = width - margin - size;
  var y = height - margin - size;
  rotate(radians(10));
  fill(255, 255, 170);
  rect(0, 0, width, height);
  fill(40);
  rect(x, y, size, size);

  noLoop();
}
