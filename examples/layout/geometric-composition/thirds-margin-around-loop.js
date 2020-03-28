function setup()
{
  createCanvas(450, 600);

  var margin = height / 20;
  var imgWidth = width - 2 * margin;
  var allHeight = height - 4 * margin;
  var imgHeight = allHeight / 3;
  var colors = [
    color(75, 185, 165),
    color(120, 155, 155),
    color(30, 50, 50)
  ];

  background(240);
  noStroke();

  for(var i = 0; i < 3; i++) {
    fill(colors[i]);
    var imgY = margin + i * (imgHeight + margin);
    rect(margin, imgY, imgWidth, imgHeight);
  }

  noLoop();
}
