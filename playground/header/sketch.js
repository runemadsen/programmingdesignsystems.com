var r = new Rune({
  container: "#canvas",
  width: 730,
  height: 30
});

var numDots = 20;
var maxRadius = 3;
var lineWidth = r.width - (maxRadius*2);
var spacing = lineWidth / (numDots - 1);
var colDots = new Rune.Color(170);
var colLine = new Rune.Color(200);

var lines = r.group(0, 0);
var circles = r.group(0, 0);

// draw circles
for(var i = 0; i < numDots; i++) {
  var x = maxRadius + (i*spacing);
  var y = Math.round(r.height/2)// + (Math.sin(Rune.radians(i * 40)) * 3);
  var radius = 2//Rune.random(2, 3.5);
  r.circle(x, y, radius, circles)
    .stroke(false)
    //.fill('hsv', 200 - (i * 2), 80, 80)
    //.fill('hsv', 200, 20, 90)
    .fill(180)
}

// draw lines
for(var i = 0; i < circles.children.length - 1; i++) {
  var current = circles.children[i];
  var next = circles.children[i+1];
  r.line(current.vars.x, current.vars.y, next.vars.x, next.vars.y, lines)
    //.stroke(current.vars.fill);
    .stroke(200)
    .strokeWidth(0.5)
}

r.draw();
