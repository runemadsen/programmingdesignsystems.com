function fillHsluv(h, s, l) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  fill(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

function setup()
{
  createCanvas(600, 850);
  background(30);
	noStroke();

  var size = 30;

  colorMode(HSL);
  translate(90, 110);
  for(var i = 0; i < 8; i++) {
    for(var j = 0; j < 5; j++) {
      fill(random(360), 100, 50);
      ellipse(i * size * 2, j * size * 2, size, size);
    }
  }

  colorMode(RGB);
  translate(0, 380);
  for(var i = 0; i < 8; i++) {
    for(var j = 0; j < 5; j++) {
      fillHsluv(random(360), 100, 50);
      ellipse(i * size * 2, j * size * 2, size, size);
    }
  }

  noLoop();
}
