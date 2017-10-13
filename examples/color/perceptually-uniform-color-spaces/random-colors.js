function fillHsluv(h, s, l) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  fill(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

function setup()
{
  createCanvas(600, 770);
  background(240);
	noStroke();

  var fontSize = 30;
  textSize(fontSize);

  translate(50, 50 + fontSize);
  colorMode(HSL);
  for(var i = 0; i < 10; i++) {
    fill(random(360), 100, 50);
    text("Can you read this line of text?", 0, i * fontSize);
  }

  colorMode(RGB);
  translate(0, 340);
  for(var i = 0; i < 10; i++) {
    fillHsluv(random(360), 100, 50);
    text("Can you read this line of text?", 0, i * fontSize);
  }

  noLoop();
}
