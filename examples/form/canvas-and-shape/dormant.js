function setup() {

  createCanvas(600, 450);
  background(230);

  var rectWidth = height * 0.5;
  var rectHeight = rectWidth * 0.5;
  var x = (width/2) - (rectWidth/2);
  var y = (height/2) - (rectHeight/2);

  noStroke();
  fill(30);
  rect(x, y, rectWidth, rectHeight);

  noLoop();
}
