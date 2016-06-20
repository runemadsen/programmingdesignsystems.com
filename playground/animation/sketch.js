var queue = [];
var cur = 0;
var colors = ["#6e97b2", "#ae3c37", "#ecc94a", "#3f8358", "#9372ae"]

// Line
// --------------------------------------------

function Line(start, stop, col) {
  this.start = start;
  this.stop = stop;
  this.col = col;
  this.cur = createVector(0, 0);
  var diff = p5.Vector.sub(stop, start);
  this.mag = diff.mag();
  this.speed = diff.copy().normalize().mult(2);
}

Line.prototype = {

  display: function() {

    fill(this.col);
    stroke(this.col);
    strokeWeight(1.5);
    ellipse(this.start.x, this.start.y, 6, 6);
    line(this.start.x, this.start.y, this.start.x + this.cur.x, this.start.y + this.cur.y);

    if(!this.done) {
      this.cur.add(this.speed);
      this.done = this.cur.mag() > this.mag;
    }
  }
}

// P5.js
// --------------------------------------------

function setup() {
  createCanvas(1000, 700);
}

function draw() {
  background(245);

  for(var i = 0; i < queue.length; i++) {
    queue[i].display();
  }

  var last = queue[queue.length-1];
  if(!last || last.done) {
    queue.push(new Line(
      last ? last.stop.copy() : createVector(random(0, width),random(0, height)),
      createVector(random(0, width),random(0, height)),
      colors[floor(random(colors.length))]
    ));
  }

}
