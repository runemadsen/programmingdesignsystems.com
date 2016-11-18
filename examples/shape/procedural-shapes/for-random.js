function setup()
{
  createCanvas(600, 300);
  background(255, 255, 220);
  noStroke();
  fill(30);

  translate(width/2, height/2);
  beginShape();
  for(var i = 0; i < 10; i++) {
    var x = random(-100, 100);
    var y = random(-100, 100);
    vertex(x, y);
  }
  endShape();

  noLoop();
}
