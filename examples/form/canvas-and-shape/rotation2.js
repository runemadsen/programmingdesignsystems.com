function setup() {
  createCanvas(600, 450);
  background(230);
  rectMode(CENTER);
  noStroke();
  fill(30);
  translate(width/2, height/2);
  rotate(radians(45));
  rect(0, 0, height * 0.4, height * 0.4);
  noLoop();
}
