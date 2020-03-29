function colorHsluv(h, s, l) {
  const rgb = hsluv.hsluvToRgb([h, s, l]);
  return color(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

function setup() {
  createCanvas(600, 460);
  noStroke();

  const colors = [];
  for(let i = 0; i < 3; i++) {
    colors.push(
      colorHsluv(240, 100, 20 + (i * 30))
    )
  }

  fill(colors[0]);
  rect(0, 0, width, height);
  fill(colors[1]);
  rect(145, 95, 375, 200);
  fill(colors[2]);
  rect(85, 155, 375, 200);

  noLoop();
}
