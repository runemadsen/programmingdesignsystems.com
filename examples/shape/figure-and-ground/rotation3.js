function setup() {
  createCanvas(600, 450);
  background(255, 255, 220);;
  rectMode(CENTER);
  noStroke();
  fill(40);
  translate(width/2, height/2);
  rotate(radians(-27));
  rect(0, 0, height * 0.4, height * 0.4);
  noLoop();
}
