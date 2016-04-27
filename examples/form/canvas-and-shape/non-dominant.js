function setup() {

  createCanvas(600, 450);
  background(230);

  var rectSize = height * 0.1;

  rectMode(CENTER);
  noStroke();
  fill(30);
  rect(width/2, height/2, rectSize, rectSize);

  noLoop();
}
