function setup() {

  createCanvas(300, 570);

  background(255);
  push();

  const rows = 12;
  const waves = 6;
  const waveSize = width * 0.15;
  const padding = width * 0.05;
  const thickness = width * 0.005;
  const borderThickness = width * 0.02;
  const cy = width * 0.03;

  translate(padding, padding);
  stroke(30);
  strokeWeight(borderThickness);
  rect(0, 0, width-(2*padding), height-(2*padding));

  strokeWeight(thickness);
  fill(255);
  const bby = rows * waveSize;

  for (let r = 0; r < rows; r++) {

    const curve = (waveSize/3) * (r / (rows-1));
    const offset = waveSize/2;

    push();

    const trans = waveSize * r - (waveSize/2);

    translate(0, trans);

    beginShape();

    for (let c = 0; c < waves; c++) {
      const co = c * waveSize;
      vertex(co, waveSize-cy);
      bezierVertex(co+curve, waveSize-cy, co+(waveSize/2), waveSize/2-cy, co+(waveSize/2), waveSize/2-cy);
      bezierVertex(co+(waveSize/2), waveSize/2-cy, co+waveSize-curve, waveSize-cy, co+waveSize, waveSize-cy);
    }

    const lco = (waves-1) * waveSize;

    // this one goes down to the bottom
    vertex(lco+waveSize, waveSize-cy);
    vertex(lco+waveSize, (rows-r)*waveSize + waveSize/2);
    vertex(0, (rows-r)*waveSize + waveSize/2);
    vertex(0, waveSize-cy);

    endShape();

    pop();
  }

  pop();


  noLoop();
}
