function setup()
{
  createCanvas(600, 500);
  background(240);
  stroke(30);
  noFill();

  strokeWeight(20);
  strokeCap(SQUARE);
  translate((width/2) - 200, height/2);
  beginShape();
  for(var i = 0; i < 200; i++) {
    // 2 pixel spacing on the x-axis. {!1}
    var x = i * 2;
    // 200 pixel high waveform on the y-axis. {!1}
    var y = cos(i * radians(2)) * 100;
    vertex(x, y);
  }
  endShape();

  noLoop();
}
