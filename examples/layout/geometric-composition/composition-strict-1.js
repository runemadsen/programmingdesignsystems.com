function setup()
{
  createCanvas(450, 600);

  var margin = height / 30;
  var allWidth = width - 3 * margin;
  var allHeight = height - 5 * margin;
  var moduleHeight = allHeight / 4;
  var moduleWidth = allWidth / 2;

  background(240);
  noStroke();

  fill(30, 50, 50);
  rect(margin, margin, moduleWidth, moduleHeight / 4);

  fill(120, 155, 155);
  rect(margin + moduleWidth + margin, margin + moduleHeight + margin, moduleWidth, moduleHeight);

  fill(75, 185, 165);
  rect(margin, margin + 2 * (moduleHeight + margin), 2 * moduleWidth + margin, 2 * moduleHeight + margin);

  noLoop();
}
