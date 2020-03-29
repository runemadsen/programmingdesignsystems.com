function setup() {

  createCanvas(600, 450);
  background(240);

  const rectSize = height * 0.15;
  const x = width - (rectSize*2);
  const y = height - (rectSize*2);

  noStroke();
  fill(40);
  rect(x, y, rectSize, rectSize);

  noLoop();
}
