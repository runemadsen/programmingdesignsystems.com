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
    if(seed > 0.7)      o.line.strokeDash('2,2')
    else if(seed > 0.6) o.line.strokeDash([r.random(5, 10), r.random(5, 10)].join(','))

    return o;
  }

  function randSpacedArray(num, minSpace) {
    if(num == 1) return [];
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

  function nextPosition(grid) {

    // for now just choose a random module
    // this should be substituted for random walk
    // using curCol and curRow
    var flattened = [];
    for(var i = 0; i < grid.cols; i++) {
      for(var j = 0; j < grid.rows; j++) {
        var mod = grid.modules[i][j];
        if(!mod.used) flattened.push(mod);
      }
    }

    if(flattened.length == 0) return null;

    var mod = flattened[Math.floor(r.random(flattened.length))];
    mod.used = true;

    var insideMod = mod.pos.add(new Rune.Vector(r.random(mod.siz.x), r.random(mod.siz.y)));
    return insideMod;
  }

  function calcGrid(px) {

    var grid = {
      curCol: 0,
      curRow: 0,
      modules: [],
      cols: Math.round(window.innerWidth / px),
      rows: Math.round(window.innerHeight / px)
    }

    var moduleWidth = window.innerWidth / grid.cols;
    var moduleHeight = window.innerHeight / grid.rows;

    for(var i = 0; i < grid.cols; i++) {
      grid.modules[i] = [];
      for(var j = 0; j < grid.rows; j++) {
        grid.modules[i][j] = {
          used: false,
          pos: new Rune.Vector(i * moduleWidth, j * moduleHeight),
          siz: new Rune.Vector(moduleWidth, moduleHeight)
        };
      }
    }

    return grid;
  }

  function drawGrid(grid) {
    for(var i = 0; i < grid.modules.length; i++) {
      for(var j = 0; j < grid.modules[i].length; j++) {
        var m = grid.modules[i][j];
        r.rect(m.pos.x, m.pos.y, m.siz.x, m.siz.y).fill(false).stroke(200);
      }
    }
  }

  var grid = calcGrid(400);
  drawGrid(grid);

  // Create queue
  var queue = [];
  var start;
  var stop = grid.modules[grid.curCol][grid.curRow].pos;

  while(true) {

    start = stop;
    stop = nextPosition(grid);
    if(!stop) break;

    // break into several line segments
    var segments;
    var diff = stop.sub(start);
    var maxSegments = Math.floor(diff.length() / 25);
    var numSegments = 1;//Math.round(r.random(1, maxSegments));

    // space them evenly or random?
    if(r.random(1) > 0.5) segments = evenSpacedArray(numSegments);
    else                  segments = randSpacedArray(numSegments, 0.15);
    segments.unshift(0)
    segments.push(1);

    // create segments vectors
    var vecs = [];
    for(var i = 0; i < segments.length; i++) {
      vecs.push(start.lerp(stop, segments[i]));
    }

    // zigzag the vectors?
    var zigzag = false;//r.random(1) > 0.8;
    if(zigzag) {
      var move = r.random(100);
      var offset = stop.sub(start).normalize().rotate(90).multiply(move);
      for(var i = 1; i < vecs.length-1; i++) {
        var inout = ((i % 2) * 2) - 1;
        vecs[i] = vecs[i].add(offset.multiply(inout));
      }
    }

    // create line objects for each vector
    for(var i = 1; i < vecs.length; i++) {
      var bezier = r.random(1) > 0.5;
      if(bezier) queue.push(addStyles(new Bezier(vecs[i-1], vecs[i])));
      else queue.push(addStyles(new Line(vecs[i-1], vecs[i])));
    }

  }

  var cur = 0;

  r.on('update', function() {

    if(queue[cur].done) {
      r.circle(queue[cur].stop.x, queue[cur].stop.y, 3)
        .fill(queue[cur].line.state.stroke)
        .stroke(false)

      if(cur == queue.length-1) {
        r.pause();
        return;
      } else {
        cur++;
      }
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
