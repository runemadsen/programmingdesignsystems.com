function setup() {

  createCanvas(300, 570);

  background(255);
  push();

  var rows = 12;
  var waves = 6;
  var waveSize = width * 0.15;
  var padding = width * 0.05;
  var thickness = width * 0.005;
  var borderThickness = width * 0.02;
  var cy = width * 0.03;

  translate(padding, padding);
  stroke(30);
  strokeWeight(borderThickness);
  rect(0, 0, width-(2*padding), height-(2*padding));

  strokeWeight(thickness);
  fill(255);
  var bby = rows * waveSize;

  for (var r = 0; r < rows; r++) {

    var curve = (waveSize/3) * (r / (rows-1));
    var offset = waveSize/2;

    push();

    var trans = waveSize * r - (waveSize/2);

    translate(0, trans);

    beginShape();

    for (var c = 0; c < waves; c++) {
      var co = c * waveSize;
      vertex(co, waveSize-cy);
      bezierVertex(co+curve, waveSize-cy, co+(waveSize/2), waveSize/2-cy, co+(waveSize/2), waveSize/2-cy);
      bezierVertex(co+(waveSize/2), waveSize/2-cy, co+waveSize-curve, waveSize-cy, co+waveSize, waveSize-cy);
    }

    var lco = (waves-1) * waveSize;

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
