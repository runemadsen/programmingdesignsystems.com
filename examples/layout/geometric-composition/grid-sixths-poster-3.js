function setup()
{
  createCanvas(450, 600);

  var margin = height / 20;
  var allWidth = width - 3 * margin;
  var allHeight = height - 4 * margin;
  var imgHeight = allHeight / 3;
  var imgWidth = allWidth / 2;

  background(240);
  fill(30);

  translate(margin + imgWidth + margin, margin);

  rect(0, 0, imgWidth, imgHeight);
  rect(0, margin + imgHeight, imgWidth, imgHeight);
  rect(0, 2 * (margin + imgHeight), imgWidth, imgHeight);

  noLoop();
}
