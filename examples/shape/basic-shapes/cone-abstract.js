function setup() {
  createCanvas(600, 500);
  background(255);

  var ellipseX = width / 2;
  var ellipseY = height * 0.3;
  var ellipseSize = width * 0.32;
  var triangleY = height * 0.36;
  var spacing = width * 0.01;
  strokeWeight(spacing*0.5);

  noFill();
  stroke(40);
  ellipse(ellipseX, ellipseY, ellipseSize, ellipseSize);

  noStroke();
  fill(255);
  rect(0, triangleY - spacing, width, height);

  noFill();
  stroke(40);
  triangle(ellipseX - (ellipseSize/2) - spacing, triangleY, ellipseX + (ellipseSize/2) + spacing, triangleY, ellipseX, height * 0.9);

  noLoop();
}
