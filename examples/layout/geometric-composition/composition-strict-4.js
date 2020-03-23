function setup()
{
  createCanvas(450, 600);

  var margin = height / 15;
  var allWidth = width - 3 * margin;
  var allHeight = height - 5 * margin;
  var moduleHeight = allHeight / 4;
  var moduleWidth = allWidth / 2;

  background(240);
  noStroke();

  translate(margin, margin);
  fill(10, 175, 145);
  rect(0, 0, 2 * moduleWidth + margin, moduleHeight / 4);

  translate(0, moduleHeight + margin);
  fill(40, 90, 80);
  rect(0, 0, moduleWidth, moduleHeight);

  translate(moduleWidth + margin, moduleHeight + margin);
  fill(30, 50, 50);
  rect(0, 0, moduleWidth, 2 * moduleHeight + margin);

  noLoop();
}
