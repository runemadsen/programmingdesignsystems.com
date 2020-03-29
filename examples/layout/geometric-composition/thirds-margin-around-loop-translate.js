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

  // Translate to the position of the first image {!1}
  translate(margin, margin);

  for(let i = 0; i < 3; i++) {
    fill(colors[i]);
    rect(0, 0, imgWidth, imgHeight);

    // Translate to the position of the next image {!1}
    translate(0, imgHeight + margin);
  }

  noLoop();
}
