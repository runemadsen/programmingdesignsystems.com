function setup() {

  createCanvas(600, 500);
  background(255, 255, 220);

  fill(40);
  noStroke();

  beginShape();
  vertex(0, height);
  vertex(width * 0.2, height * 0.4);
  vertex(width * 0.35, height * 0.6);
  vertex(width * 0.50, height * 0.2);
  vertex(width * 0.70, height * 0.5);
  vertex(width * 0.85, height * 0.3);
  vertex(width, height);
  endShape();

  noLoop();
}
