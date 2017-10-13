function setup() {
  createCanvas(600, 450);
  background(240);
  rectMode(CENTER);
  noStroke();
  fill(40);
  translate(width/2, height/2);
  rotate(radians(90));
  rect(0, 0, height * 0.4, height * 0.4);
  noLoop();
}
