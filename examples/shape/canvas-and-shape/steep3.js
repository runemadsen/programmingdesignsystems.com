function setup() {
  createCanvas(600, 450);
  background(255, 255, 220);;

  var x = width * 0.3;
  var y = height * 1;
  var w = width * 2;
  var h = width * 1;

  noStroke();
  fill(40);
  translate(x, y);
  rotate(radians(-50));
  rect(0, 0, w, h);
  noLoop();
}
