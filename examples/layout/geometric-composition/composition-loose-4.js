function setup()
{
  createCanvas(450, 600);

  var margin = height / 5;
  var moduleWidth = width - 2 * margin;
  var allHeight = height - 2 * margin;
  var moduleHeight = allHeight / 2;

  background(240);
  noStroke();

  fill(30, 50, 50);
  rect(margin, margin * 0.6, moduleWidth, margin * 0.2);


  fill(75, 185, 165);
  rect(margin, margin, moduleWidth, moduleHeight);


  fill(120, 155, 155);
  rect(margin, margin + moduleHeight * 1.2, moduleWidth, moduleHeight * 0.8);

  noLoop();
}
