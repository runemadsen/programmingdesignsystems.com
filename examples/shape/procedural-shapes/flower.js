function setup()
{
  createCanvas(600, 500);
  background(255, 255, 220);
  noStroke();
  fill(30);

  translate(width/2, height/2);

  var numVertices = 7;
  var spacing = 360 / numVertices;

  beginShape();
  for(var i = 0; i < numVertices+1; i++) {

    var angle = i * spacing;
    var x = cos(radians(angle)) * 100;
    var y = sin(radians(angle)) * 100;

    if(i == 0) {
      vertex(x, y);
    }
    else {
      var cAngle = angle - spacing/2;
      var cX = cos(radians(cAngle)) * 180;
      var cY = sin(radians(cAngle)) * 180;
      quadraticVertex(cX, cY, x, y)
    }
  }
  endShape();

  noLoop();
}
