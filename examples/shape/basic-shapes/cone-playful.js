function setup() {
  createCanvas(600, 500);
  background(255);

  var ellipseX = width / 2;
  var ellipseY = height * 0.3;
  var ellipseSize = width * 0.32;
  var triangleY = height * 0.36;
  var spacing = width * 0.01;
  strokeWeight(spacing*1.5);

  noFill();
  stroke(40);
  ellipse(ellipseX + (spacing*2), ellipseY, ellipseSize * 1.1, ellipseSize * 1.1);

  fill(255);
  noStroke();
  push();
  translate(0, triangleY - (spacing*4));
  rotate(radians(3));
  rect(0, 0, width, height);
  pop();

  fill(40);
  noStroke();
  triangle(ellipseX - (ellipseSize/2) - spacing, triangleY, ellipseX + (ellipseSize/2) + spacing, triangleY, ellipseX, height * 0.9);

  noLoop();
}
