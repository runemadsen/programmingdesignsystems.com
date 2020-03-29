function setup() {
  createCanvas(600, 500);
  background(240);
  noStroke();
  fill(40);
  const size = width * 0.15;
  translate(width/2, height/2);
  triangle(0, -size, size, size, -size, size);
  fill(40, 180, 155);
  ellipse(0, 0, size*0.2, size*0.2);
  noLoop();
}
