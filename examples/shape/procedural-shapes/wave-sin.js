function setup()
{
  createCanvas(600, 500);
  background(240);
  stroke(30);
  noFill();

  strokeWeight(20);
  strokeCap(SQUARE);

  translate((width/2) - 200, height/2);
  beginShape();
  for(var i = 0; i < 200; i++) {
    var x = i * 2;
    var y = sin(i * 0.03) * 100;
    vertex(x, y);
  }
  endShape();

  noLoop();
}
