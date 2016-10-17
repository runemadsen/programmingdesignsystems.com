function setup()
{
  createCanvas(600, 500);
  background(255, 255, 220);

  var r = width * 0.25;

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
