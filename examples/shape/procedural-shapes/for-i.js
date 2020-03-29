function setup()
{
  createCanvas(600, 300);
  background(240);
  fill(30);
  noStroke();

  for(let i = 0; i < 10; i++) {
    rect(i, 0, 100, 100);
  }

  noLoop();
}
