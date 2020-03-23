function setup()
{
  createCanvas(450, 600);

  var margin = height / 20;
  var imgWidth = width - 2 * margin;
  var allHeight = height - 4 * margin;
  var imgHeight = allHeight / 3;
  var colors = [
    color(10, 175, 145),
    color(40, 90, 80),
    color(30, 50, 50)
  ];

  background(240);
  noStroke();

  // Translate to the position of the first image {!1}
  translate(margin, margin);

  for(var i = 0; i < 3; i++) {
    fill(colors[i]);
    rect(0, 0, imgWidth, imgHeight);

    // Translate to the position of the next image {!1}
    translate(0, imgHeight + margin);
  }

  noLoop();
}
