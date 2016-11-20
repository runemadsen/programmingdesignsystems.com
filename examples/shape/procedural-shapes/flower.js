function setup()
{
  createCanvas(600, 400);
  background(255, 255, 220);
  noStroke();
  fill(30);

  translate(width/2, height/2);

  // Automatically calculate the spacing {!2}
  var numVertices = 7;
  var spacing = 360 / numVertices;

  beginShape();
  // Loop one extra time to close shape with a curved line. {!1}
  for(var i = 0; i < numVertices+1; i++) {

    // Find the position for the vertex {!3}
    var angle = i * spacing;
    var x = cos(radians(angle)) * 100;
    var y = sin(radians(angle)) * 100;

    if(i == 0) {
      // If this is the first run of the loop, create simple vertex. {!1}
      vertex(x, y);
    }
    else {
      // Otherwise create a quadratic Bézier vertex with a control point halfway in
      // between the points and with a higher radius. {!4}
      var cAngle = angle - spacing/2;
      var cX = cos(radians(cAngle)) * 180;
      var cY = sin(radians(cAngle)) * 180;
      quadraticVertex(cX, cY, x, y)
    }
  }
  endShape();

  noLoop();
}
