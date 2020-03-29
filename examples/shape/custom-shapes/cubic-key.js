function setup()
{
  createCanvas(600, 500);
  background(240);

  const w = width * 0.3;
  const h = height * 0.5;

  stroke(30);
  strokeWeight(width*0.1);
  strokeCap(SQUARE);
  noFill();
  translate(width/2, height/2);
  beginShape();
    vertex(-w, 0)
    bezierVertex(-w, -h, w, h, w, 0);
  endShape();

  noLoop();
}
