function setup()
{
  createCanvas(600, 400);
  background(255, 255, 220);

  noStroke();
  colorMode(HSB, 1, 1, 1);
  fill(0.0195, 0.76, 0.82);
  ellipse(150, height/2, 200, 200);

  fill(0.15, 0.80, 0.96);
  ellipse(300, height/2, 200, 200);

  fill(0.569, 0.71, 0.67);
  ellipse(450, height/2, 200, 200);

  noLoop();
}
