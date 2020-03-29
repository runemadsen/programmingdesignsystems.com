function setup() {

  createCanvas(600, 500);
  background(240);

  const w = width * 0.4;
  const h = width * 0.25;

  noStroke();
  fill(40);
  translate((width/2) - (w/2), height/2);

  beginShape();
  vertex(0, 0);
  vertex(0, h);
  vertex(w, h);
  vertex(w, 0);
  vertex(w/2, -h);
  endShape();

  noLoop();
}
