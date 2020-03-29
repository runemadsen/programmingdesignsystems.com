function setup()
{
  createCanvas(600, 500);
  background(240);

  translate(width/2, height/2);

  noFill();
  const radius = width * 0.3;
  ellipse(0, 0, radius*2, radius*2);

  fill(30);
  const x = cos(radians(330)) * radius;
  const y = sin(radians(330)) * radius;
  ellipse(x, y, 20, 20);

  noLoop();
}
