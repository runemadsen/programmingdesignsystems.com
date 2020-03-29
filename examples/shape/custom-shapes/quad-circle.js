function setup()
{
  createCanvas(600, 500);
  background(240);

  const r = width * 0.25;

  noStroke();
  fill(30);
  translate(width/2, height/2);
  beginShape();
    vertex(0, -r)
    quadraticVertex(r, -r, r, 0);
    quadraticVertex(r, r, 0, r);
    quadraticVertex(-r, r, -r, 0);
    quadraticVertex(-r, -r, 0, -r);
  endShape();

  noLoop();
}
