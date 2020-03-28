function setup()
{
  createCanvas(450, 600);

  var imgWidth = width;
  var imgHeight = height / 3;

  noStroke();
  fill(75, 185, 165);
  rect(0, 0, imgWidth, imgHeight);

  fill(120, 155, 155);
  rect(0, imgHeight, imgWidth, imgHeight);

  fill(30, 50, 50);
  rect(0, 2 * imgHeight, imgWidth, imgHeight);

  noLoop();
}
