var r;

function runSplash() {

  r = new Rune({
    container: "#canvas"
  });

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
    this.line = r.path(0, 0).moveTo(start.x, start.y).curveTo(this.control.x, this.control.y, stop.x, stop.y);
    this.cur = 0;
    this.speed = 2 / this.line.length();
    // after calculating length, set bezier to 0 to start animation
    // from nothing.
    this.line.state.anchors[1].vec1 = start;
    this.line.state.anchors[1].vec2 = start;
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

    // set color
    o.line.stroke("#08ac8c");
    o.line.fill(false);
    o.line.strokeWidth(1.5);

    // choose line type
    var seed = r.random(1);
    if(seed > 0.7) {
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

  function nextArea(areas) {
    var index = Math.floor(r.random(areas.length));
    var ran = areas.splice(index, 1)[0];
    return ran;
  }

  function nextVector(areas, areaPx) {
    var area = nextArea(areas);
    if(!area) return null;
    var max = area.x + areaPx > r.width ? r.width : area.x + areaPx;
    var may = area.y + areaPx > r.height ? r.height : area.y + areaPx;
    return new Rune.Vector(r.random(area.x, max),r.random(area.y, may));
  }

  function evenSpacedArray(num) {
    var ite = 1 / num;
    var arr = [];
    for(var i = 0; i < num - 1; i++) {
      arr.push((i+1) * ite);
    }
    return arr;
  }

  function calcAreas(px) {
    var areas = [];
    var x = 0;
    while(x < window.innerWidth) {
      var y = 0;
      while(y < window.innerHeight) {
        areas.push(new Rune.Vector(x, y));
        y += px;
      }
      x += px;
    }
    return areas;
  }

  var queue = [];
  var cur = 0;
  var areaPx = 50;
  var areas = calcAreas(areaPx);

  r.on('update', function() {

    // If we need to add more things to the queue
    if(cur >= queue.length - 1) {

      // find the start and stop of the new line
      var last = queue[queue.length-1]
      var start = last ? last.stop.copy() : null;
      if(!start) start = nextVector(areas, areaPx);
      var stop = nextVector(areas, areaPx);
      if(!stop) {
        r.pause();
        return;
      }

      var diff = stop.sub(start);
      var maxSegments = Math.floor(diff.length() / 25);

      // split this line into several line objects
      var numLines = Math.round(r.random(1, maxSegments > 5 ? 5 : maxSegments));
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
}

if(window.location.pathname == "/") {
  runSplash();
  window.addEventListener('resizeEnd', function() {

    if(r) {
      r.pause();
      r.el.parentNode.removeChild(r.el);
    }

    runSplash();
  });
}
