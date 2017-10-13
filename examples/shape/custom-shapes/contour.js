function setup()
{
  createCanvas(600, 500);
  background(240);

  var w = width * 0.7;
  var h = height * 0.7;

  translate((width/2) - (w/2), (height/2) - (h/2));

  fill(30);
  noStroke();
  beginShape();
    vertex(0, 0);
    vertex(w, 0);
    vertex(w, h);
    vertex(0, h);
    beginContour();
      vertex(w * 0.3, h * 0.3);
      vertex(w * 0.5, h * 0.8);
      vertex(w * 0.8, h * 0.4);
    endContour();
  endShape();

  noLoop();
}
