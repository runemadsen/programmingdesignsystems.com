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

  translate(margin + moduleWidth + margin, margin);

  fill(75, 185, 165);
  rect(0, 0, moduleWidth, moduleHeight);

  fill(120, 155, 155);
  rect(0, margin + moduleHeight, moduleWidth, moduleHeight);

  fill(30, 50, 50);
  rect(0, 2 * (margin + moduleHeight), moduleWidth, moduleHeight);

  noLoop();
}
