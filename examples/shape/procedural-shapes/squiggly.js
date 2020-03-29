function setup()
{
  createCanvas(600, 400);
  background(240);
  noStroke();
  fill(30);

  translate(width/2, height/2);

  beginShape();
  for(let i = 0; i < 100; i++) {
    // Change the radius for every vertex {!1}
    const radius = 100 + random(5);
    const x = cos(radians(i * 3.6)) * radius;
    const y = sin(radians(i * 3.6)) * radius;
    vertex(x, y);
  }
  endShape();

  noLoop();
}
