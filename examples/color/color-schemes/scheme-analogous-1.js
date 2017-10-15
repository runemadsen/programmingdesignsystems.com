function fillHsluv(h, s, l) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  fill(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

function setup() {
  createCanvas(600, 460);
  noStroke();
  fillHsluv(75, 95, 70);
  rect(0, 0, width, height);
  fillHsluv(35, 90, 40);
  rect(145, 95, 375, 200);
  fillHsluv(55, 100, 80);
  rect(85, 155, 375, 200);
  noLoop();
}
