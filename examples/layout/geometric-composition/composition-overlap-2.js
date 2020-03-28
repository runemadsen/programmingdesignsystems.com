function setup()
{
  createCanvas(450, 600);

  var margin = height / 10;
  var allWidth = width - 4 * margin;
  var allHeight = height - 5 * margin;
  var moduleHeight = allHeight / 4;
  var moduleWidth = allWidth / 3;

  background(240);
  noStroke();

  translate(margin, margin);

  fill(75, 185, 165);
  rect(0, 0, 3 * moduleWidth + 2 * margin, 3 * moduleHeight + 2 * margin);

  fill(30, 50, 50);
  rect(0, 0, 2 * moduleWidth + margin, moduleHeight / 3);

  fill(120, 155, 155);
  rect(moduleWidth + margin, 2 * (moduleHeight + margin), 2 * moduleWidth + margin, moduleHeight);

  noLoop();
}
