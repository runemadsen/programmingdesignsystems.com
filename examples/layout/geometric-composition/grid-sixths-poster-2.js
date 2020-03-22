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

  rect(margin + moduleWidth + margin, margin, moduleWidth, moduleHeight);
  rect(margin, margin + moduleHeight + margin, moduleWidth, moduleHeight);
  rect(margin + moduleWidth + margin, height - margin - moduleHeight, moduleWidth, moduleHeight);

  noLoop();
}
