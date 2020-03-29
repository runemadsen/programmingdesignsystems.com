function fillHsluv(h, s, l) {
  const rgb = hsluv.hsluvToRgb([h, s, l]);
  fill(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

function setup() {
  createCanvas(719, 899);
	noStroke();

  const boxh = height / 10;
  for(let i = 0; i < 10; i++) {
    const h = lerp(64, 22, i / 9);
    const s = lerp(86, 90, i / 9);
    const l = lerp(96, 56, i / 9);
    fillHsluv(h, s, l);
    rect(0, i * boxh, width, boxh);
  }

  noLoop();
}
