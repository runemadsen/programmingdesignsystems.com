var r = new Rune({
  container: "body",
  width: 1000,
  height: 800
});

var queue = [];
var cur = 0;

// USE OFFSET OF SEGMENTS
// MAKE SURE SEGMENTS ARE SPACED MORE THAN X APART
// ADD BEZIER CURVES

// Line
// --------------------------------------------

function Line(start, stop) {
  this.start = start;
  this.stop = stop;
  this.line = r.line(start.x, start.y, start.x, start.y);
  this.cur = 0;
  this.speed = 2 / stop.sub(start).length();
}

Line.prototype = {

  update: function() {
    var pos = this.start.lerp(this.stop, this.cur);
    this.line.end(pos.x, pos.y);
    if(!this.done) {
      this.cur += this.speed;
      this.done = this.cur >= 1;
    }
  }
}

function addStyles(o) {

  // choose color
  var colors = ["#6e97b2", "#ae3c37", "#ecc94a", "#3f8358", "#9372ae"];
  var color = colors[Math.floor(r.random(colors.length))];
  o.line.stroke(color);
  o.line.strokeWidth(1.5);

  // choose line type
  var seed = r.random(1);
  if(seed > 0.8) {
    // MAKE DOTTED AGAIN
  }
  else if(seed > 0.6) {
    var dashing = r.random(5, 10);
    var spacing = r.random(5, 10);
    o.line.strokeDash([dashing, spacing].join(','))
  }

  return o;
}

// P5.js
// --------------------------------------------

r.on('update', function() {

  // If we need to add more things to the queue
  if(cur >= queue.length - 1) {

    var last = queue[queue.length-1]
    var start = last ? last.stop.copy() : new Rune.Vector(r.random(0, r.width),r.random(0, r.height));
    var stop = new Rune.Vector(r.random(0, r.width),r.random(0, r.height));

    // Zig Zag lines
    var numLines = Math.round(r.random(1, 5));
    var splits = [];
    var offsets = [];
    for(var i = 0; i < numLines; i++) {
      splits.push(r.random(1));
      offsets.push(r.random(-100, 100));
    }
    splits.sort();
    for(var i = 0; i < numLines; i++) {
      var segmentStart = start.lerp(stop, i == 0 ? 0 : splits[i-1]);
      var segmentStop = start.lerp(stop, i == numLines-1 ? 1 : splits[i]);
      queue.push(addStyles(new Line(segmentStart, segmentStop)));
    }
  }

  if(queue[cur].done) {
    var curLine = queue[cur].line;
    r.circle(curLine.state.x2, curLine.state.y2, 3)
      .fill(curLine.state.stroke)
      .stroke(false)
    cur++;
  }

  queue[cur].update();
});

r.play();
