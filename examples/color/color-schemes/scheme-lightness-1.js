function fillHsluv(h, s, l) {
  const rgb = hsluv.hsluvToRgb([h, s, l]);
  fill(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

function setup() {
  createCanvas(600, 460);
  noStroke();
  fillHsluv(0, 0, 90);
  rect(0, 0, width, height);
  fillHsluv(0, 0, 85);
  rect(145, 95, 375, 200);
  fillHsluv(0, 0, 95);
  rect(85, 155, 375, 200);
  noLoop();
}
