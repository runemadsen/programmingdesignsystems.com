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

  fill(75, 185, 165);
  rect(margin, margin, imgWidth, imgHeight);

  fill(120, 155, 155);
  rect(margin, margin + imgHeight + margin, imgWidth, imgHeight);
  
  fill(30, 50, 50);
  rect(margin, margin + 2 * (imgHeight + margin), imgWidth, imgHeight);

  noLoop();
}
