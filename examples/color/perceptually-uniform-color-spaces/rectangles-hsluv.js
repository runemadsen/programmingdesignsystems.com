function setup()
{
  createCanvas(800, 300);
  background(240);

  noStroke();

  const g = hsluv.rgbToHsluv([85 / 255, 255 / 255, 0]);
  const b = hsluv.rgbToHsluv([0, 0, 255 / 255]);

	const col1 = createVector(g[0], g[1], g[2]);
	const col2 = createVector(b[0], b[1], b[2]);
	const numRects = 10;
  const rectWidth = width / numRects;

	for(let i = 0; i < numRects; i++) {
		const curLerp = i / numRects;
		const col = p5.Vector.lerp(col1, col2, curLerp);
    const rgb = hsluv.hsluvToRgb([col.x, col.y, col.z]);
		fill(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
		rect(i * rectWidth, 0, rectWidth, height);
	}

  noLoop();
}
