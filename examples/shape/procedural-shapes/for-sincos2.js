function setup()
{
  createCanvas(600, 300);
  background(240);
  noStroke();
  fill(30);

  const numVertices = 3; // or 4 or 30
  const spacing = 360 / numVertices;
  translate(width/2, height/2);
  beginShape();
  for(let i = 0; i <= numVertices; i++) {
    const x = cos(radians(i * spacing)) * 100;
    const y = sin(radians(i * spacing)) * 100;
    vertex(x, y);
  }
  endShape();

  noLoop();
}
