var r = new Rune({
  container: "#canvas",
  width: 1000,
  height: 700
});

function Line(start, stop, color, type) {
  this.line = r.line(start, start).strokeWidth(2);
  this.change = stop.sub(start);
  this.normalized = this.change.normalize();
}

Line.prototype = {
  update: function() {
    this.line.add(this.normalized);
  }
}

var line = new Line(
  new Rune.Vector(0, 0),
  new Rune.Vector(400, 200),
  new Rune.Color(255, 0, 0)
);

r.on('draw', function() {
  line.update();
});

r.play();
