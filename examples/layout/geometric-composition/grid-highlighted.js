function setup()
{
  createCanvas(450, 600);

  const margin = height / 20;
  const allWidth = width - 3 * margin;
  const allHeight = height - 4 * margin;
  const moduleWidth = allWidth / 2;
  const moduleHeight = allHeight / 3;

  background(240);
  noStroke();

  translate(margin, margin);
  fill(75, 185, 165);
  rect(0, 0, 2 * moduleWidth + margin, 2 * moduleHeight + margin);

  translate(0, 2 * (moduleHeight + margin));
  fill(120, 155, 155);
  rect(0, 0, moduleWidth, moduleHeight);

  fill(30, 50, 50);
  rect(moduleWidth + margin, 0, moduleWidth, moduleHeight);

  noLoop();
}
