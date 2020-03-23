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

  for(var i = 0; i < 3; i++) {
    fill(colors[i]);
    var imgY = margin + i * (imgHeight + margin);
    rect(margin, imgY, imgWidth, imgHeight);
  }

  noLoop();
}
