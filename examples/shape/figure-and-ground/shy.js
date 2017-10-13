function setup() {
  createCanvas(600, 450);
  background(240);
  noStroke();
  fill(40);

  var size = width * 0.1;
  var x = width - size;
  var y = height - size;
  rect(x, y, size, size);

  noLoop();
}
