var queue = [];
var cur = -1;

// USE OFFSET OF SEGMENTS
// MAKE SURE SEGMENTS ARE SPACED MORE THAN X APART
// ADD BEZIER CURVES

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
  this.mag = stop.copy().sub(start).mag();
  this.cur = 0;
  this.speed = 2 / this.mag;

  // Make spacing and dashing relative to line mag
  if(lineType.spacing) lineType.spacing /= this.mag;
  if(lineType.dashing) lineType.dashing /= this.mag;
}

Line.prototype = {

  display: function() {

    fill(this.lineType.color);
    stroke(this.lineType.color);
    strokeWeight(1.5);
    ellipse(this.start.x, this.start.y, 6, 6);

    var pos = this.start.copy().lerp(this.stop, this.cur);

    if(this.lineType.type == 'solid') {
      line(this.start.x, this.start.y, pos.x, pos.y);
    }
    else if(this.lineType.type == 'dotted' || this.lineType.type == 'dashed') {

      var dashCur = 0;
      while(dashCur < this.cur) {
        var dashStart = this.start.copy().lerp(this.stop, dashCur);
        if(this.lineType.type == 'dotted') {
          ellipse(dashStart.x, dashStart.y, 1.5, 1.5);
          dashCur += this.lineType.spacing;
        }
        else {
          dashCur += this.lineType.dashing;
          var dashEnd = this.start.copy().lerp(this.stop, dashCur);
          line(dashStart.x, dashStart.y, dashEnd.x, dashEnd.y);
          dashCur += this.lineType.spacing;
        }
      }

    }

    if(!this.done) {
      this.cur += this.speed;
      this.done = this.cur >= 1;
    }
  }
}

// P5.js
// --------------------------------------------

function setup() {
  createCanvas(1000, 700);
}

function draw() {

  background(255);

  for(var i = 0; i <= cur; i++) {
    queue[i].display();
  }

  if(cur == -1 || queue[cur].done) {

    // If we need to add more things to the queue
    if(cur < queue.length) {

      var last = queue[queue.length-1]
      var start = last ? last.stop.copy() : createVector(random(0, width),random(0, height));
      var stop = createVector(random(0, width),random(0, height));

      // Zig Zag lines
      var numLines = round(random(1, 5));
      var splits = [];
      var offsets = [];
      for(var i = 0; i < numLines; i++) {
        splits.push(random(1));
        offsets.push(random(-100, 100));
      }
      splits.sort();
      for(var i = 0; i < numLines; i++) {
        var segmentStart = start.copy().lerp(stop, i == 0 ? 0 : splits[i-1]);
        var segmentStop = start.copy().lerp(stop, i == numLines-1 ? 1 : splits[i]);
        queue.push(new Line(segmentStart, segmentStop, new LineType()));
      }
    }

    cur++;
  }
}
