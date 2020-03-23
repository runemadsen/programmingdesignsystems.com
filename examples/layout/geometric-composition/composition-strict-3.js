function setup()
{
  createCanvas(450, 600);

  var margin = height / 20;
  var allWidth = width - 3 * margin;
  var allHeight = height - 5 * margin;
  var moduleHeight = allHeight / 4;
  var moduleWidth = allWidth / 2;

  background(240);
  noStroke();

  translate(margin, margin);
  fill(30, 50, 50);
  rect(0, 0, 2 * moduleWidth + margin, 3 * moduleHeight + 2 * margin);

  translate(0, 3 * (moduleHeight + margin));
  fill(10, 175, 145);
  rect(0, 0, moduleWidth, moduleHeight / 4);

  fill(40, 90, 80);
  rect(moduleWidth + margin, 0, moduleWidth, moduleHeight);

  noLoop();
}
