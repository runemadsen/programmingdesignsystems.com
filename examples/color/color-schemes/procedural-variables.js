function colorHsluv(h, s, l) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  return color(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

function setup() {
  createCanvas(600, 460);
  noStroke();

  // Which color values should we start with? {!3}
  var startHue = random(0, 360);
  var startSat = random(40, 100);
  var startLig = random(0, 60);

  // How much should each color change? {!3}
  var changeHue = random(10, 120);
  var changeSat = random(15, 40);
  var changeLig = random(15, 40)

  var colors = [];
  for(var i = 0; i < 3; i++) {
    colors.push(
      colorHsluv(
        // Use these values in the same algorithm as before {!3}
        startHue + (i * changeHue),
        startSat + (i * changeSat),
        startLig + (i * changeLig)
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
