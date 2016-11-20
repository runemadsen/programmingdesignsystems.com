function setup()
{
  createCanvas(600, 300);
  background(255, 255, 220);
  noStroke();
  fill(30);

  translate(width/2, height/2);

  var radius = 100;  
  beginShape();
  for(var i = 0; i < 10; i++) {
    var x = cos(radians(i * 36)) * radius;
    var y = sin(radians(i * 36)) * radius;
    vertex(x, y);

    if(radius == 100) {
      radius = 50;
    } else {
      radius = 100;
    }
  }
  endShape();

  noLoop();
}
