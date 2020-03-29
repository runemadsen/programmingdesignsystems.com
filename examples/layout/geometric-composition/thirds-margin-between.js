function setup()
{
  createCanvas(450, 600);

  var margin = height / 20;
  var allHeight = height - 2 * margin;
  var imgHeight = allHeight / 3;

  background(240);
  noStroke();

  fill(75, 185, 165);
  rect(0, 0, width, imgHeight);

  fill(120, 155, 155);
  rect(0, imgHeight + margin, width, imgHeight);

  fill(30, 50, 50);
  rect(0, 2 * (imgHeight + margin), width, imgHeight);

  noLoop();
}
