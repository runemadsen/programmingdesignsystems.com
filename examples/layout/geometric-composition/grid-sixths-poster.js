function setup()
{
  createCanvas(450, 600);

  var margin = height / 20;
  var allWidth = width - 3 * margin;
  var allHeight = height - 4 * margin;
  var imgHeight = allHeight / 3;
  var imgWidth = allWidth / 2;

  background(240);
  fill(30);

  rect(margin, margin, imgWidth, imgHeight);
  rect(margin, height - margin - imgHeight, imgWidth, imgHeight);

  rect(margin, margin, imgWidth, imgHeight);
  rect(margin + imgWidth + margin, height - margin - imgHeight, imgWidth, imgHeight);

  noLoop();
}
