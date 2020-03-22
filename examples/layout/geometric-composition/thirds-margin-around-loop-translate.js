function setup()
{
  createCanvas(450, 600);

  var margin = height / 20;
  var imgWidth = width - 2 * margin;
  var allHeight = height - 4 * margin;
  var imgHeight = allHeight / 3;

  background(240);
  noStroke();
  fill(30);

  // Translate to the position of the first image {!1}
  translate(margin, margin);
  
  for(var i = 0; i < 3; i++) {
    rect(0, 0, imgWidth, imgHeight);

    // Translate to the position of the next image {!1}
    translate(0, imgHeight + margin);
  }

  noLoop();
}
