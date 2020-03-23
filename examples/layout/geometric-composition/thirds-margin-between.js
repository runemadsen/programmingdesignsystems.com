function setup()
{
  createCanvas(450, 600);

  var margin = height / 20;
  var imgWidth = width;
  var allHeight = height - 2 * margin;
  var imgHeight = allHeight / 3;

  background(240);
  noStroke();

  fill(10, 175, 145);
  rect(0, 0, imgWidth, imgHeight);

  fill(40, 90, 80);
  rect(0, imgHeight + margin, imgWidth, imgHeight);
  
  fill(30, 50, 50);
  rect(0, 2 * (imgHeight + margin), imgWidth, imgHeight);

  noLoop();
}
