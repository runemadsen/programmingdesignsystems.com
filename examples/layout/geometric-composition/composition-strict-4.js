function setup()
{
  createCanvas(450, 600);

  const margin = height / 15;
  const allWidth = width - 3 * margin;
  const allHeight = height - 5 * margin;
  const moduleWidth = allWidth / 2;
  const moduleHeight = allHeight / 4;

  background(240);
  noStroke();

  translate(margin, margin);
  fill(30, 50, 50);
  rect(0, 0, 2 * moduleWidth + margin, moduleHeight / 2);

  translate(0, moduleHeight + margin);
  fill(120, 155, 155);
  rect(0, 0, moduleWidth, moduleHeight);

  translate(moduleWidth + margin, moduleHeight + margin);
  fill(75, 185, 165);
  rect(0, 0, moduleWidth, 2 * moduleHeight + margin);

  noLoop();
}
