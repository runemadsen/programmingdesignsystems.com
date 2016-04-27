function setup() {

  createCanvas(600, 450);
  background(255, 255, 220);

  var rectSize = height * 0.3;
  var rectX = width * 0.3;
  var rectY = height * 0.3;

  translate(rectX, rectY);
  noStroke();
  fill(255, 255, 170);
  rect(0, 0, width, height);
  fill(40);
  rect(0, 0, rectSize, rectSize);

  noLoop();
}
