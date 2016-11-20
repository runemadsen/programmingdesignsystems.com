function setup()
{
  createCanvas(600, 400);
  background(255, 255, 220);
  noStroke();
  fill(30);

  translate(width/2, height/2);

  beginShape();
  for(var i = 0; i < 100; i++) {
    // Change the radius for every vertex {!1}
    var radius = 100 + random(5);
    var x = cos(radians(i * 3.6)) * radius;
    var y = sin(radians(i * 3.6)) * radius;
    vertex(x, y);
  }
  endShape();

  noLoop();
}
