function setup() {
  createCanvas(600, 500);
  background(240);
  noStroke();
  fill(40);
  const size = width * 0.3;
  ellipse(width/2, height/2, size, size);
  fill(40, 180, 155);
  ellipse(width/2, height/2, size*0.1, size*0.1);
  noLoop();
}
