function fillHsluv(h, s, l) {
  const rgb = hsluv.hsluvToRgb([h, s, l]);
  fill(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

function strokeHsluv(h, s, l) {
  const rgb = hsluv.hsluvToRgb([h, s, l]);
  stroke(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

function setup()
{
  createCanvas(600, 400);
  background(240);

  noStroke();
  fillHsluv(0, 100, 50);
  ellipse(150, height/2, 200, 200);

  noFill();
  strokeWeight(5);
  strokeHsluv(120, 100, 50);
  ellipse(300, height/2, 200, 200);

  noStroke();
  fillHsluv(240, 100, 50);
  ellipse(450, height/2, 200, 200);

  noLoop();
}
