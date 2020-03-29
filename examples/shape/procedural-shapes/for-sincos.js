function setup()
{
  createCanvas(600, 300);
  background(240);
  noStroke();
  fill(30);

  translate(width/2, height/2);
  beginShape();
  for(let i = 0; i < 10; i++) {
    const x = cos(radians(i * 36)) * 100;
    const y = sin(radians(i * 36)) * 100;
    vertex(x, y);
  }
  endShape();

  noLoop();
}
