function setup()
{
  createCanvas(450, 600);

  var margin = height / 20;
  var allWidth = width - 4 * margin;
  var allHeight = height - 5 * margin;
  var moduleHeight = allHeight / 4;
  var moduleWidth = allWidth / 3;

  background(240);
  noStroke();

  translate(margin, margin);

  fill(75, 185, 165);
  rect(moduleWidth + margin, moduleHeight + margin, 2 * moduleWidth + margin, 2 * moduleHeight + margin);

  fill(30, 50, 50);
  rect(0, 0, 3 * moduleWidth + 2 * margin, moduleHeight / 2);

  fill(120, 155, 155);
  rect(0, 2 * (moduleHeight + margin), 2 * moduleWidth + margin, 2 * moduleHeight + margin);

  noLoop();
}
