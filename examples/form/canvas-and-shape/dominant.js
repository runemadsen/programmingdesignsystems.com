function setup() {

  createCanvas(600, 450);
  background(230);

  var rectSize = height * 0.7;
  var x = (width/2) - (rectSize/2);
  var y = (height/2) - (rectSize/2);

  noStroke();
  fill(30);
  rect(x, y, rectSize, rectSize);

  noLoop();
}
