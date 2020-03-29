function setup()
{
  createCanvas(450, 600);

  const margin = height / 15;
  const allWidth = width - 4 * margin;
  const allHeight = height - 5 * margin;
  const moduleWidth = allWidth / 3;
  const moduleHeight = allHeight / 4;
  const headingHeight = moduleHeight / 2;

  background(240);
  noStroke();

  translate(margin, margin);

  fill(75, 185, 165);
  rect(moduleWidth + margin, 0, 2 * moduleWidth + margin, 4 * moduleHeight + 3 * margin);

  fill(120, 155, 155);
  rect(0, moduleHeight + margin, 2 * moduleWidth + margin, 2 * moduleHeight + margin);

  fill(30, 50, 50);
  rect(0, 4 * moduleHeight + 3 * margin - headingHeight, 3 * moduleWidth + 2 * margin, headingHeight);

  noLoop();
}
