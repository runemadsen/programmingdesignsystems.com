function setup() {
  createCanvas(600, 500);
  background(240);
  colorMode(HSL);

  noStroke();

  const hues = [0, 90, 180, 270];
  const numPoints = 12;
  const pointDegree = 360 / numPoints;
  const radius = width / 4;
  const strokeW = width / 10;

  // Color circle
  translate(width / 2, height / 2);
  rotate(radians(-90 - pointDegree / 2));

  for (let i = 0; i < numPoints; i++) {
    fill(i * pointDegree, 100, 50);

    const thisAngle = radians(i * pointDegree);
    const nextAngle = radians((i + 1) * pointDegree);

    beginShape();
    vertex(cos(thisAngle) * radius, sin(thisAngle) * radius);
    vertex(
      cos(thisAngle) * (radius + strokeW),
      sin(thisAngle) * (radius + strokeW)
    );
    vertex(
      cos(nextAngle) * (radius + strokeW),
      sin(nextAngle) * (radius + strokeW)
    );
    vertex(cos(nextAngle) * radius, sin(nextAngle) * radius);
    endShape(CLOSE);
  }

  // Color scheme
  rotate(radians(pointDegree / 2));
  stroke(0, 0, 60);
  strokeWeight(strokeW / 20);
  noFill();
  beginShape();
  for (let i = 0; i < hues.length; i++) {
    const x = cos(radians(hues[i])) * (radius + strokeW / 2);
    const y = sin(radians(hues[i])) * (radius + strokeW / 2);
    vertex(x, y);
  }
  endShape(CLOSE);

  noStroke();
  fill(0, 0, 100);
  for (let i = 0; i < hues.length; i++) {
    const x = cos(radians(hues[i])) * (radius + strokeW * 0.4);
    const y = sin(radians(hues[i])) * (radius + strokeW * 0.4);
    ellipse(x, y, strokeW / 3);
  }

  noLoop();
}
