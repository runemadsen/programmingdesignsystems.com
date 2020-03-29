function setup()
{
  createCanvas(450, 600);

  const margin = height / 20;
  const imgWidth = width - 2 * margin;
  const allHeight = height - 4 * margin;
  const imgHeight = allHeight / 3;
  const colors = [
    color(75, 185, 165),
    color(120, 155, 155),
    color(30, 50, 50)
  ];

  background(240);
  noStroke();

  for(let i = 0; i < 3; i++) {
    fill(colors[i]);
    const imgY = margin + i * (imgHeight + margin);
    rect(margin, imgY, imgWidth, imgHeight);
  }

  noLoop();
}
