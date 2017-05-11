function setup()
{
  createCanvas(800, 500);
  background(30);

  fill(0);
  rect(0, 0, width, height);

  colorMode(HSL);
	noStroke();

  var cols = 10;
  var siz = width / cols;

  for(var i = 0; i < cols; i++) {
    //fill(random(360), 100, 50);
    //rect(i * siz, 0, siz, siz)
    //ellipse(x -(tileSize/2), y -(tileSize/2), circleSize, circleSize);
  }

  noLoop();
}
