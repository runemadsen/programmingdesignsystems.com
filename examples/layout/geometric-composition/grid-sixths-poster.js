function setup()
{
  createCanvas(450, 600);

  var margin = height / 20;
  var allWidth = width - 3 * margin;
  var allHeight = height - 4 * margin;
  var moduleHeight = allHeight / 3;
  var moduleWidth = allWidth / 2;

  background(240);
  noStroke();

  fill(75, 185, 165);
  rect(margin, margin, moduleWidth, moduleHeight);

  fill(120, 155, 155);
  rect(margin, height - margin - moduleHeight, moduleWidth, moduleHeight);

  fill(30, 50, 50);
  rect(margin + moduleWidth + margin, height - margin - moduleHeight, moduleWidth, moduleHeight);

  noLoop();
}
