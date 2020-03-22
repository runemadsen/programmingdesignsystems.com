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

  translate(margin, margin);
  rect(0, 0, 2 * moduleWidth + margin, 2 * moduleHeight + margin);

  translate(0, 2 * (moduleHeight + margin));
  rect(0, 0, moduleWidth, moduleHeight);
  rect(moduleWidth + margin, 0, moduleWidth, moduleHeight);

  noLoop();
}
