function setup()
{
  createCanvas(450, 600);

  var margin = height / 20;
  var allWidth = width - 3 * margin;
  var allHeight = height - 4 * margin;
  var moduleHeight = allHeight / 3;
  var moduleWidth = allWidth / 2;

  background(240);
  fill(30);

  translate(margin + moduleWidth + margin, margin);

  rect(0, 0, moduleWidth, moduleHeight);
  rect(0, margin + moduleHeight, moduleWidth, moduleHeight);
  rect(0, 2 * (margin + moduleHeight), moduleWidth, moduleHeight);

  noLoop();
}
