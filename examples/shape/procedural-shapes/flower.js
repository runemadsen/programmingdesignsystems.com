function setup()
{
  createCanvas(600, 400);
  background(240);
  noStroke();
  fill(30);

  translate(width/2, height/2);

  // Automatically calculate the spacing {!2}
  const numVertices = 7;
  const spacing = 360 / numVertices;

  beginShape();
  // Loop one extra time to close shape with a curved line. {!1}
  for(let i = 0; i < numVertices+1; i++) {

    // Find the position for the vertex {!3}
    const angle = i * spacing;
    const x = cos(radians(angle)) * 100;
    const y = sin(radians(angle)) * 100;

    if(i == 0) {
      // If this is the first run of the loop, create simple vertex. {!1}
      vertex(x, y);
    }
    else {
      // Otherwise create a quadratic Bézier vertex with a control point halfway in
      // between the points and with a higher radius. {!4}
      const cAngle = angle - spacing/2;
      const cX = cos(radians(cAngle)) * 180;
      const cY = sin(radians(cAngle)) * 180;
      quadraticVertex(cX, cY, x, y)
    }
  }
  endShape();

  noLoop();
}
