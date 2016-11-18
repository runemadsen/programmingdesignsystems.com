function setup()
{
  createCanvas(600, 500);
  background(255, 255, 220);

  translate(width/2, height/2);

  var radius = width * 0.3;
  ellipse(0, 0, radius*2, radius*2);

  var x = cos(radians(330)) * radius;
  var y = sin(radians(330)) * radius;
  ellipse(x, y, 20, 20);

  noLoop();
}
