function setup()
{
  createCanvas(800, 300);
  background(255, 255, 220);

  colorMode(HSB);
	noStroke();

	var col1 = createVector(100, 100, 100);
	var col2 = createVector(240, 100, 100);
	var numRects = 10;
  var rectWidth = width / numRects;

	for(var i = 0; i < numRects; i++) {
		var curLerp = i / numRects;
		var col = p5.Vector.lerp(col1, col2, curLerp);
		fill(col.x, col.y, col.z);
		rect(i * rectWidth, 0, rectWidth, height);
	}

  noLoop();
}
