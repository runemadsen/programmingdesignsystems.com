function setup()
{
  createCanvas(450, 600);

  const margin = height / 20;
  const allWidth = width - 3 * margin;
  const allHeight = height - 4 * margin;
  const imgWidth = allWidth / 2;
  const imgHeight = allHeight / 3;

  background(240);
  noFill();
  stroke(255, 0, 0);

  translate(margin, margin);
  rect(0, 0, imgWidth, imgHeight);
  rect(imgWidth + margin, 0, imgWidth, imgHeight);

  translate(0, margin + imgHeight);
  rect(0, 0, imgWidth, imgHeight);
  rect(imgWidth + margin, 0, imgWidth, imgHeight);

  translate(0, margin + imgHeight);
  rect(0, 0, imgWidth, imgHeight);
  rect(imgWidth + margin, 0, imgWidth, imgHeight);

  noLoop();
}
