function setup() {
  createCanvas(600, 380);
  noStroke();
	background(240);

  // Define the color object once {!1}
  var red = color(225, 35, 35);

  fill(red);
  rect(50, 50, 200, 180);

  fill(40, 185, 155);
  rect(200, 100, 200, 180);

  fill(red);
  rect(350, 150, 200, 180);

  noLoop();
}
