function setup()
{
  createCanvas(450, 600);

  var margin = height / 20;
  var imgWidth = width - 2 * margin;
  var allHeight = height - 4 * margin;
  var imgHeight = allHeight / 3;

  background(240);
  noStroke();
  fill(30);

  for(var i = 0; i < 3; i++) {
    var imgY = margin + i * (imgHeight + margin);
    rect(margin, imgY, imgWidth, imgHeight);
  }

  noLoop();
}
