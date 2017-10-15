function fillHsluv(h, s, l) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  fill(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

function setup() {
  createCanvas(600, 460);
  noStroke();
  fillHsluv(270, 65, 15);
  rect(0, 0, width, height);
  fillHsluv(295, 70, 55);
  rect(145, 95, 375, 200);
  fillHsluv(278, 100, 73);
  rect(85, 155, 375, 200);
  noLoop();
}
