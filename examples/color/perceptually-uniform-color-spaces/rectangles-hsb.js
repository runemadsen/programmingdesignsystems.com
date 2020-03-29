function setup()
{
  createCanvas(800, 300);
  background(240);

  colorMode(HSB);
	noStroke();

	const col1 = createVector(100, 100, 100);
	const col2 = createVector(240, 100, 100);
	const numRects = 10;
  const rectWidth = width / numRects;

	for(let i = 0; i < numRects; i++) {
		const curLerp = i / numRects;
		const col = p5.Vector.lerp(col1, col2, curLerp);
		fill(col.x, col.y, col.z);
		rect(i * rectWidth, 0, rectWidth, height);
	}

  noLoop();
}
