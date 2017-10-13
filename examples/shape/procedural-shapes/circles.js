function setup()
{
  createCanvas(600, 500);
  background(240);

  translate(width/2, height/2);

  noFill();
  var radius = width * 0.3;
  ellipse(0, 0, radius*2, radius*2);

  fill(30);
  var x = cos(radians(330)) * radius;
  var y = sin(radians(330)) * radius;
  ellipse(x, y, 20, 20);

  noLoop();
}
