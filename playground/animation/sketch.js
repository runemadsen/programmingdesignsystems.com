var r = new Rune({
  container: "body",
  width: 1000,
  height: 800
});

var queue = [];
var cur = 0;

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

// Bezier
// --------------------------------------------

function Bezier(start, stop) {
  this.start = start;
  this.stop = stop;
  var mid = start.lerp(stop, 0.5);
  var offset = r.random(-100, 100);
  this.control = stop.sub(start).normalize().rotate(90).multiply(offset).add(mid);
  this.line = r.path(0, 0).moveTo(start.x, start.y).curveTo(start.x, start.y, start.x, start.y);
  this.cur = 0;
  this.speed = 2 / stop.sub(start).length();
}

Bezier.prototype = {

  update: function() {
    var pos1 = this.start.lerp(this.control, this.cur);
    var pos2 = this.control.lerp(this.stop, this.cur);
    var pos3 = pos1.lerp(pos2, this.cur);
    this.line.state.anchors[1].vec1 = pos1;
    this.line.state.anchors[1].vec2 = pos3;
    this.line.changed();

    if(!this.done) {
      this.cur += this.speed;
      this.done = this.cur >= 1;
    }
  }
}

// Shared
// --------------------------------------------

function addStyles(o) {

  // choose color
  var colors = ["#6e97b2", "#ae3c37", "#ecc94a", "#3f8358", "#9372ae"];
  var color = colors[Math.floor(r.random(colors.length))];
  o.line.stroke(color);
  o.line.fill(false);
  o.line.strokeWidth(1.5);

  // choose line type
  var seed = r.random(1);
  if(seed > 0.8) {
    o.line.strokeDash('2,2')
  }
  else if(seed > 0.6) {
    var dashing = r.random(5, 10);
    var spacing = r.random(5, 10);
    o.line.strokeDash([dashing, spacing].join(','))
  }

  return o;
}

function spacedRandArray(num, minSpace) {
  var arr = [r.random(1)];
  var temp = null;
  for(var x = 0; x < num-2; x++) {
    do { temp = r.random(1); }
    while ( Math.abs(temp - arr[x]) <= minSpace);
    arr.push( temp );
  }
  return arr.sort();
}

function evenSpacedArray(num) {
  var ite = 1 / num;
  var arr = [];
  for(var i = 0; i < num - 1; i++) {
    arr.push((i+1) * ite);
  }
  return arr;
}

r.on('update', function() {

  // If we need to add more things to the queue
  if(cur >= queue.length - 1) {

    // find the start and stop of the new line
    var last = queue[queue.length-1]
    var start = last ? last.stop.copy() : new Rune.Vector(r.random(0, r.width),r.random(0, r.height));
    var stop = new Rune.Vector(r.random(0, r.width),r.random(0, r.height));

    // split this line into several line objects
    var numLines = Math.round(r.random(1, 5));
    var evenSpaced = r.random(1) > 0.5;
    var zigzag = r.random(1) > 0.8;
    var segments;

    // space them evenly or random
    if(evenSpaced) {
      segments = evenSpacedArray(numLines);
    } else {
      segments = spacedRandArray(numLines, 0.15);
    }
    segments.unshift(0)
    segments.push(1);
    var vecs = [];
    for(var i = 0; i < numLines; i++) {
      vecs.push(start.lerp(stop, segments[i]));
    }

    // zigzag the points?
    if(zigzag) {
      var move = r.random(100);
      var offset = stop.sub(start).normalize().rotate(90).multiply(move);
      for(var i = 1; i < numLines-1; i++) {
        var inout = ((i % 2) * 2) - 1;
        vecs[i] = vecs[i].add(offset.multiply(inout));
      }
    }

    // create the line objects
    for(var i = 1; i < numLines; i++) {
      var bezier = r.random(1) > 0.5;
      if(bezier) queue.push(addStyles(new Bezier(vecs[i-1], vecs[i])));
      else queue.push(addStyles(new Line(vecs[i-1], vecs[i])));
    }
  }

  if(queue[cur].done) {
    r.circle(queue[cur].stop.x, queue[cur].stop.y, 3)
      .fill(queue[cur].line.state.stroke)
      .stroke(false)
    cur++;
  }

  queue[cur].update();
});

r.play();
