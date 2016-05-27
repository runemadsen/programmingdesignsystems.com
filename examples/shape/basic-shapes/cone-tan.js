function setup() {
  createCanvas(600, 700);
  background(255);
  strokeWeight(width * 0.007);

  var coneX = width / 2;
  var coneY = height * 0.4;
  var coneSize = width * 0.4;

  // Ellipses
  translate(coneX, coneY);
  for(var i = 0; i < 5; i++) {
    var ellipseSize = (coneSize * 0.35) + (i * (coneSize*0.05));
    fill(i % 2 == 0 ? 0 : 255);
    for(var j = -1; j <= 1; j += 2) {
      var x = Math.cos(radians(-90 + (45 * i * j))) * (coneSize * 0.5);
      var y = Math.sin(radians(-90 + (45 * i * j))) * (coneSize * 0.3);
      ellipse(x, y, ellipseSize, ellipseSize);
    }
  }

  // Triangles
  fill(255);
  translate(0, coneSize * 1.5);
  for(var i = -1; i <= 1; i += 2) {
    triangle(0, 0, i * (coneSize * 0.55), -(coneSize*1.15), -(coneSize * 0.38) * i, -(coneSize*0.8));
  }

  noLoop();

}
