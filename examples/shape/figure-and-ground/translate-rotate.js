function setup() {

  createCanvas(600, 350);
  background(240);
  noStroke();

  const size = height / 3;
  const margin = width / 20;
  const x = width - margin - size;
  const y = height - margin - size;
  translate(x, y);
  rotate(radians(10));
  fill(200);
  rect(0, 0, width, height);
  fill(40);
  rect(0, 0, size, size);

  noLoop();
}
