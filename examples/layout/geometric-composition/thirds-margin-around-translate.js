function setup()
{
  createCanvas(450, 600);

  var margin = height / 20;
  var imgWidth = width - 2 * margin;
  var allHeight = height - 4 * margin;
  var imgHeight = allHeight / 3;

  background(240);
  noStroke();
  fill(30);

  // Move down to the position of the first image and draw it
  translate(margin, margin);
  rect(0, 0, imgWidth, imgHeight);

  // Move down to the second image position and draw it
  translate(0, margin + imgHeight);
  rect(0, 0, imgWidth, imgHeight);

  // Move down to the last image position and draw it
  translate(0, margin + imgHeight);
  rect(0, 0, imgWidth, imgHeight);

  noLoop();
}
