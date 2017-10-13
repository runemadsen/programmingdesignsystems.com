function setup() {

  createCanvas(600, 350);
  background(240);
  noStroke();
  fill(40);

  var size = height / 3;
  var margin = width / 20;
  var x = width - margin - size;
  var y = height - margin - size;
  rect(x, y, size, size);

  noLoop();
}
