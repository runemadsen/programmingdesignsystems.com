function setup()
{
  createCanvas(450, 600);

  var moduleHeight = height / 4;
  var moduleWidth = width / 3;

  background(240);
  noStroke();

  fill(75, 185, 165);
  rect(0, moduleHeight, 2 * moduleWidth, 2 * moduleHeight);

  fill(120, 155, 155);
  rect(moduleWidth, 2 * moduleHeight, 2 * moduleWidth, moduleHeight);


  fill(30, 50, 50);
  rect(0, 3 * moduleHeight, 3 * moduleWidth, moduleHeight / 2);

  noLoop();
}
