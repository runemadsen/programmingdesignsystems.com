function setup()
{
  createCanvas(600, 500);
  background(240);

  var w = width * 0.4;
  var h = height * 0.5;

  stroke(30);
  strokeWeight(width*0.1);
  noFill();
  translate((width/2) - (w*0.3), (height/2) - (h/2));
  beginShape();
    vertex(0, 0);
    bezierVertex(w, 0, w, h, 0, h);
  endShape(CLOSE);

  noLoop();
}
