function colorHsluv(h, s, l) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  return color(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

function setup() {
  createCanvas(600, 460);
  noStroke();

  // Start with empty array {!1}
  var colors = [];

  // Loop three times {!1}
  for(var i = 0; i < 3; i++) {

    // Push new color with random hue, saturation, and lightness into array every time {!7}
    colors.push(
      colorHsluv(
        random(360),
        random(100),
        random(100)
      )
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
