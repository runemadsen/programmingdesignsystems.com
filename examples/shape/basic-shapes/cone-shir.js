function setup() {
  createCanvas(600, 700);
  background(255);
  fill(255);
  stroke(0);
  strokeWeight(width * 0.02);
  strokeJoin(ROUND);

  var coneX = width / 2;
  var coneY = height * 0.65;
  var coneSize = width * 0.18;

  translate(coneX, coneY);

  // Ice cream
  for(var i = 3; i >= 0; i--) {
    ellipse(0, -(coneSize*0.25) - (i * (coneSize * 0.6)), coneSize, coneSize);
  }

  // Cone
  triangle(-(coneSize/2), 0, coneSize/2, 0, 0, coneSize*1.6);

  noLoop();
}
