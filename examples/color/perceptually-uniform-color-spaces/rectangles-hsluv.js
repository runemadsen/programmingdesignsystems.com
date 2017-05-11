function setup()
{
  createCanvas(800, 300);
  background(255, 255, 220);

  noStroke();

  var g = hsluv.rgbToHsluv([85 / 255, 255 / 255, 0]);
  var b = hsluv.rgbToHsluv([0, 0, 255 / 255]);

	var col1 = createVector(g[0], g[1], g[2]);
	var col2 = createVector(b[0], b[1], b[2]);
	var numRects = 10;
  var rectWidth = width / numRects;

	for(var i = 0; i < numRects; i++) {
		var curLerp = i / numRects;
		var col = p5.Vector.lerp(col1, col2, curLerp);
    var rgb = hsluv.hsluvToRgb([col.x, col.y, col.z]);
		fill(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
		rect(i * rectWidth, 0, rectWidth, height);
	}

  noLoop();
}
