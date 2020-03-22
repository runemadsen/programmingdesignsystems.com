function setup()
{
  createCanvas(450, 600);

  var margin = height / 20;
  var imgWidth = width - 2 * margin;
  var allHeight = height - 4 * margin;
  var imgHeight = allHeight / 3;

  background(240);
  noFill();
  stroke('#29b79b');

  translate(margin, margin);
  rect(0, 0, imgWidth, imgHeight);

  translate(0, margin + imgHeight);
  rect(0, 0, imgWidth, imgHeight);

  translate(0, margin + imgHeight);
  rect(0, 0, imgWidth, imgHeight);

  noLoop();
}
