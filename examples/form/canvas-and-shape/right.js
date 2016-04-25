function setup() {

  createCanvas(600, 450);
  background(230);

  var rectSize = height * 0.15;
  var x = width - (rectSize*2);
  var y = height - (rectSize*2);

  noStroke();
  fill(30);
  rect(x, y, rectSize, rectSize);

  noLoop();
}
