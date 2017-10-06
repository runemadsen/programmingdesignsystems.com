function setup() {
  createCanvas(600, 500);
  background(255, 255, 220);
  colorMode(HSL);

  noStroke();

  var hues = [0, 120, 240];
  var numPoints = 12;
  var pointDegree = 360 / numPoints;
  var radius = width / 4;
  var strokeW = width / 10;

  // Color circle
  translate(width / 2, height / 2);
  rotate(radians(-90 - pointDegree / 2));

  for (var i = 0; i < numPoints; i++) {
    fill(i * pointDegree, 100, 50);

    var thisAngle = radians(i * pointDegree);
    var nextAngle = radians((i + 1) * pointDegree);

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
  for (var i = 0; i < hues.length; i++) {
    var x = cos(radians(hues[i])) * (radius + strokeW / 2);
    var y = sin(radians(hues[i])) * (radius + strokeW / 2);
    vertex(x, y);
  }
  endShape(CLOSE);

  noStroke();
  fill(0, 0, 100);
  for (var i = 0; i < hues.length; i++) {
    var x = cos(radians(hues[i])) * (radius + strokeW * 0.4);
    var y = sin(radians(hues[i])) * (radius + strokeW * 0.4);
    ellipse(x, y, strokeW / 3);
  }

  noLoop();
}
