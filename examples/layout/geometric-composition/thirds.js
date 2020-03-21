function setup()
{
  createCanvas(450, 600);

  var imgWidth = width;
  var imgHeight = height / 3;

  noStroke();
  fill(30);
  rect(0, 0, imgWidth, imgHeight);

  fill(70);
  rect(0, imgHeight, imgWidth, imgHeight);

  fill(110);
  rect(0, 2 * imgHeight, imgWidth, imgHeight);

  noLoop();
}
