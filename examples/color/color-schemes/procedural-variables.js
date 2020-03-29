function colorHsluv(h, s, l) {
  const rgb = hsluv.hsluvToRgb([h, s, l]);
  return color(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

function setup() {
  createCanvas(600, 460);
  noStroke();

  // Which color values should we start with? {!3}
  const startHue = random(0, 360);
  const startSat = random(40, 100);
  const startLig = random(0, 60);

  // How much should each color change? {!3}
  const changeHue = random(10, 120);
  const changeSat = random(15, 40);
  const changeLig = random(15, 40)

  const colors = [];
  for(let i = 0; i < 3; i++) {
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
