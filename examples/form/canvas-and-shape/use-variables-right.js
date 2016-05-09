function setup() {

  createCanvas(600, 600);
  background(255, 255, 220);

  var size = height * 0.3;
  var margin = height * 0.1;
  var x = width - size - margin;
  var y = height - size - margin;

  noStroke();
  fill(40);
  rect(x, y, size, size);

  noLoop();
}
