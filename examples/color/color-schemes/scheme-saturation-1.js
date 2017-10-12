function fillHsluv(h, s, l) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  fill(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

function setup() {
  createCanvas(600, 460);
  noStroke();
  fillHsluv(40, 30, 65);
  rect(0, 0, width, height);
  fillHsluv(10, 40, 40);
  rect(145, 95, 375, 200);
  fillHsluv(75, 50, 85);
  rect(85, 155, 375, 200);
  noLoop();
}
