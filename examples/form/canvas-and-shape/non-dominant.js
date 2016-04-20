function setup() {

  createCanvas(600, 400);

  // Base the size of the rectangle on the
  // height of the window.
  var rectSize = height / 10;

  // Find the x and y needed to put the
  // rectangle in the middle of the screen.
  var x = (width/2) - (rectSize/2);
  var y = (height/2) - (rectSize/2);

  // Draw the rectangle.
  rect(x, y, rectSize, rectSize);
}
