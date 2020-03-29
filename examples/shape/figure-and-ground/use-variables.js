function setup() {

  createCanvas(600, 350);
  background(240);
  noStroke();
  fill(40);

  const size = height / 3;
  const margin = width / 20;
  const x = width - margin - size;
  const y = height - margin - size;
  rect(x, y, size, size);

  noLoop();
}
