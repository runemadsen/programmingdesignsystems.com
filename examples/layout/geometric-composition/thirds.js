function setup()
{
  createCanvas(450, 600);

  var imgWidth = width;
  var imgHeight = height / 3;

  noStroke();
  fill(10, 175, 145);
  rect(0, 0, imgWidth, imgHeight);

  fill(40, 90, 80);
  rect(0, imgHeight, imgWidth, imgHeight);

  fill(30, 50, 50);
  rect(0, 2 * imgHeight, imgWidth, imgHeight);

  noLoop();
}
