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

  fill(10, 175, 145);
  rect(margin + moduleWidth + margin, margin + moduleHeight + margin, moduleWidth, moduleHeight / 4);

  fill(30, 50, 50);
  rect(margin, margin + moduleHeight + margin, moduleWidth, 2 * moduleHeight + margin);

  fill(40, 90, 80);
  rect(margin + moduleWidth + margin, margin + 2 * (moduleHeight + margin), moduleWidth, moduleHeight);

  noLoop();
}
