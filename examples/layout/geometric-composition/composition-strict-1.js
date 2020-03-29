function setup()
{
  createCanvas(450, 600);

  const margin = height / 30;
  const allWidth = width - 3 * margin;
  const allHeight = height - 5 * margin;
  const moduleWidth = allWidth / 2;
  const moduleHeight = allHeight / 4;

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
