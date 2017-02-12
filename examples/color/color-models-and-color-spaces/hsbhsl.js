function setup()
{
  createCanvas(600, 400);
  background(255, 255, 220);

  noStroke();
  colorMode(HSB);
  fill(7, 76, 82);
  ellipse(150, height/2, 200, 200);

  fill(54, 80, 96);
  ellipse(300, height/2, 200, 200);

  colorMode(HSL);
  fill(205, 55, 42);
  ellipse(450, height/2, 200, 200);

  noLoop();
}
