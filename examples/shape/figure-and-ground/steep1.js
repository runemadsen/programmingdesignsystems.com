function setup() {
  createCanvas(600, 450);
  background(240);

  const w = width * 0.5;
  const h = width * 0.4;

  rectMode(CENTER);
  noStroke();
  fill(40);
  translate(width/2, height/2);
  rotate(radians(-50));
  rect(0, 0, w, h);
  noLoop();
}
