function setup()
{
  createCanvas(450, 600);

  var margin = height / 20;
  var allWidth = width - 3 * margin;
  var allHeight = height - 4 * margin;
  var imgHeight = allHeight / 3;
  var imgWidth = allWidth / 2;

  background(240);
  noFill();
  stroke('#29b79b');

  translate(margin, margin);
  rect(0, 0, imgWidth, imgHeight);
  rect(imgWidth + margin, 0, imgWidth, imgHeight);

  translate(0, margin + imgHeight);
  rect(0, 0, imgWidth, imgHeight);
  rect(imgWidth + margin, 0, imgWidth, imgHeight);

  translate(0, margin + imgHeight);
  rect(0, 0, imgWidth, imgHeight);
  rect(imgWidth + margin, 0, imgWidth, imgHeight);

  noLoop();
}
