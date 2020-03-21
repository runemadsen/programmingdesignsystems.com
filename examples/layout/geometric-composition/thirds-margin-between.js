function setup()
{
  createCanvas(450, 600);

  var margin = height / 20;
  var imgWidth = width;
  var allHeight = height - 2 * margin;
  var imgHeight = allHeight / 3;

  background(240);
  noStroke();
  fill(30);

  rect(0, 0, imgWidth, imgHeight);
  rect(0, imgHeight + margin, imgWidth, imgHeight);
  rect(0, 2 * (imgHeight + margin), imgWidth, imgHeight);

  noLoop();
}
