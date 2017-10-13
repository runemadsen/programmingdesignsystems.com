function setup()
{
  createCanvas(600, 400);
  background(240);
  noStroke();
  fill(30);

  translate(width/2, height/2);

  // Set the initial radius to 100 {!1}
  var radius = 100;

  beginShape();
  for(var i = 0; i < 10; i++) {

    // Use the radius in the cos/sin formula {!2}
    var x = cos(radians(i * 36)) * radius;
    var y = sin(radians(i * 36)) * radius;
    vertex(x, y);

    // Change the radius for the next vertex {!5}
    if(radius == 100) {
      radius = 50;
    } else {
      radius = 100;
    }
  }
  endShape();

  noLoop();
}
