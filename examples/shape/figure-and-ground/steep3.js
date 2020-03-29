function setup() {
  createCanvas(600, 450);
  background(240);

  const x = width * 0.3;
  const y = height * 1;
  const w = width * 2;
  const h = width * 1;

  noStroke();
  fill(40);
  translate(x, y);
  rotate(radians(-50));
  rect(0, 0, w, h);
  noLoop();
}
