var queue = [];
var cur = 0;

// LineType
// --------------------------------------------

function LineType() {

  // choose color
  var colors = ["#6e97b2", "#ae3c37", "#ecc94a", "#3f8358", "#9372ae"];
  this.color = colors[floor(random(colors.length))];

  // choose line type
  var seed = random(1);
  if(seed < 0.33) {
    this.type = 'solid'
  }
  else if(seed < 0.66) {
    this.type = 'dotted'
    this.spacing = random(5, 15);
  }
  else {
    this.type = 'dashed'
    this.dashing = random(5, 15);
    this.spacing = random(5, 15);
  }

}

// Line
// --------------------------------------------

function Line(start, stop, lineType) {
  this.start = start;
  this.stop = stop;
  this.lineType = lineType;
  this.cur = createVector(0, 0);
  this.diff = p5.Vector.sub(stop, start);
  this.norm = this.diff.copy().normalize();
  this.mag = this.diff.mag();
  this.speed = this.norm.copy().mult(2);
}

Line.prototype = {

  display: function() {

    fill(this.lineType.color);
    stroke(this.lineType.color);
    strokeWeight(1.5);
    ellipse(this.start.x, this.start.y, 6, 6);

    if(this.lineType.type == 'solid') {
      line(this.start.x, this.start.y, this.start.x + this.cur.x, this.start.y + this.cur.y);
    }
    else if(this.lineType.type == 'dotted') {
      var dot = createVector(0, 0);
      while(dot.mag() < this.cur.mag()) {
        ellipse(this.start.x + dot.x, this.start.y + dot.y, 1.5, 1.5);
        dot.add(this.norm.x * this.lineType.spacing, this.norm.y * this.lineType.spacing);
      }
    } else if(this.lineType.type == 'dashed') {
      var dash = createVector(0, 0);
      var dashLine = this.norm.copy().mult(this.lineType.dashing);
      while(dash.mag() < this.cur.mag()) {
        var dashStart = p5.Vector.add(this.start, dash);
        var dashEnd = dashStart.copy().add(dashLine);
        line(dashStart.x, dashStart.y, dashEnd.x, dashEnd.y);
        dash.add(this.norm.x * (this.lineType.spacing + this.lineType.dashing), this.norm.y * (this.lineType.spacing + this.lineType.dashing));
      }
    }

    if(!this.done) {
      this.cur.add(this.speed);
      this.done = this.cur.mag() >= this.mag;
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
      new LineType()
    ));
  }

}
