function setup()
{
  createCanvas(500, 450)
  background(255);
  noStroke();
  fill(255);

  beginShape();
  fill(0);
    vertex(0,height/2);
    vertex(width*8/24,height/2);
    vertex(width*9/24,height*11/32);//peak1
    vertex(width*10/24,height*13/32);
    vertex(width*11/24,height*3/32);//peak2
    vertex(width*12/24,height*8/32);
    vertex(width*13/24,height*0/32);//peak3
    vertex(width*14/24,height*10/32);
    vertex(width*15/24,height*8/32);//peak4
    vertex(width*16/24,height/2);
    vertex(width,height/2);
    vertex(width,height);
    vertex(0,height);
    vertex(0,height/2);
  endShape();

  beginShape();
    fill(255);
    vertex(width*8/24,height/2);
    bezierVertex(width*8/24,height*17/32,  width*8/24,height*19/32,   width*9/24,height*19/32);//peak1-left
    bezierVertex(width*10/24,height*19/32,  width*9/24,height*17/32  ,width*10/24,height*17/32);//peak1-right
    bezierVertex(width*11/24,height*17/32,  width*19/48,height*23/32  ,width*11/24,height*23/32);//peak2-left
    bezierVertex(width*12/24,height*23/32,  width*11/24,height*21/32  ,width*12/24,height*21/32);//peak2-right
    bezierVertex(width*13/24,height*21/32,  width*11/24,height*29/32  ,width*13/24,height*29/32);//peak3-left
    bezierVertex(width*29/48,height*29/32,  width*13/24,height*19/32  ,width*14/24,height*19/32);//peak3-right
    bezierVertex(width*15/24,height*19/32,  width*14/24,height*22/32  ,width*15/24,height*22/32);//peak4-left
    bezierVertex(width*16/24,height*22/32,  width*16/24,height*19/32  ,width*16/24,height/2);//peak4-right
    vertex(width*8/24,height/2);
  endShape();

  noLoop();
}
