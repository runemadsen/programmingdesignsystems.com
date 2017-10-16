function fillHsluv(h, s, l) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  fill(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

function setup() {
  createCanvas(719, 899);
	noStroke();

  var boxh = height / 10;
  for(var i = 0; i < 10; i++) {
    var h = lerp(64, 22, i / 9);
    var s = lerp(86, 90, i / 9);
    var l = lerp(96, 56, i / 9);
    fillHsluv(h, s, l);
    rect(0, i * boxh, width, boxh);
  }

  noLoop();
}
