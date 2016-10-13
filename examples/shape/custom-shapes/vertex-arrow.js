function setup() {

  createCanvas(600, 500);
  background(255, 255, 220);

  var w = width * 0.35;
  var h = width * 0.5;

  noFill();
  stroke(40);
  strokeCap(SQUARE);
  strokeWeight(width * 0.08);
  translate((width/2) - (w/2), (height/2) - (h/2));
  beginShape();
  vertex(0, 0);
  vertex(w, h/2);
  vertex(0, h);
  endShape();

  noLoop();
}
