function setup()
{
  createCanvas(450, 600);

  var moduleHeight = height / 4;
  var moduleWidth = width / 3;

  background(240);
  noStroke();

  fill(75, 185, 165);
  rect(0, 0, 2 * moduleWidth, 3 * moduleHeight);

  fill(120, 155, 155);
  rect(moduleWidth, 2 * moduleHeight, 2 * moduleWidth, 2 * moduleHeight);

  fill(30, 50, 50);
  rect(moduleWidth, moduleHeight, 2 * moduleWidth, moduleHeight / 4);

  noLoop();
}
