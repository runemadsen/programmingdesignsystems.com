function setup() {
  createCanvas(600, 450);
  background(240);
  noStroke();
  fill(40);

  const size = width * 0.1;
  const x = width - size;
  const y = height - size;
  rect(x, y, size, size);

  noLoop();
}
