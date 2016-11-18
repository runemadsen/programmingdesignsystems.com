function setup()
{
  createCanvas(600, 300);
  background(255, 255, 220);
  stroke(30);

  for(var i = 0; i < 10; i++) {
    rect(i, 0, 100, 100);
  }

  noLoop();
}
