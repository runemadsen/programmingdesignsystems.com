function setup()
{
  createCanvas(450, 600);

  var margin = height / 15;
  var allWidth = width - 3 * margin;
  var allHeight = height - 4 * margin;
  var moduleHeight = allHeight / 3;
  var moduleWidth = allWidth / 2;

  background(240);
  noStroke();
  fill(75, 185, 165);

  translate(margin, margin);

  rect(0, margin / 2, moduleWidth, moduleHeight - margin);
  rect(moduleWidth + margin, 0, moduleWidth, moduleHeight);
  rect(margin / 2, moduleHeight + margin, moduleWidth + margin / 2, moduleHeight);
  rect(moduleWidth + 2 * margin, moduleHeight + margin, moduleWidth - margin, moduleHeight + margin);
  rect(0, 2 * (moduleHeight + margin), moduleWidth - margin, moduleHeight - margin);
  rect(moduleWidth, 2 * moduleHeight + 3 * margin, moduleWidth + margin, moduleHeight - margin);

  noLoop();
}
