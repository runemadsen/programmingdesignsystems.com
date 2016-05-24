function setup() {
  createCanvas(600, 500);
  background(255, 255, 220);
  noStroke();
  fill(40);
  var size = width * 0.45;
  translate(width/2, height/2);
  triangle(0, -(size/2), size/2, size/2, -(size/2), size/2);
  noLoop();
}
