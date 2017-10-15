function colorHsluv(h, s, l) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  return color(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

function setup() {
  createCanvas(600, 460);
  noStroke();

  var colors = [
    colorHsluv(40, 100, 65),
    colorHsluv(10, 100, 40),
    colorHsluv(75, 100, 85)
  ];

  fill(colors[0]);
  rect(0, 0, width, height);
  fill(colors[1]);
  rect(145, 95, 375, 200);
  fill(colors[2]);
  rect(85, 155, 375, 200);

  noLoop();
}
