function setup() {

  createCanvas(600, 450);
  background(255, 255, 220);

  var rectSize = height * 0.3;
  var rectX = width * 0.3;
  var rectY = height * 0.3;

  rotate(radians(10));
  noStroke();
  fill(255, 255, 170);
  rect(0, 0, width, height);
  fill(40);
  rect(rectX, rectX, rectSize, rectSize);

  noLoop();
}
