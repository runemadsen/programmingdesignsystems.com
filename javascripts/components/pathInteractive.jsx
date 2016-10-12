var React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      currentDragger: null,
      pathData: [
        { cmd: 'M', x: 100, y: 100 },
        { cmd: 'L', x: 300, y: 60 },
        { cmd: 'L', x: 270, y: 300 },
        { cmd: 'L', x: 150, y: 350 },
        { cmd: 'Z' }
      ]
    }
  },

  startDrag: function(i) {
    this.setState({ currentDragger: i});
  },

  mouseUp: function(el) {
    if(this.state.currentDragger != null) {
      this.setState({ currentDragger: null });
    }
  },

  mouseMoved: function(e) {

    if(this.state.currentDragger != null) {
      var arrayCopy = this.state.pathData.slice();
      var itemCopy = Object.assign({}, arrayCopy[this.state.currentDragger]);

      var svgPos = e.currentTarget.getBoundingClientRect();
      itemCopy.x = Math.round(e.clientX - svgPos.left);
      itemCopy.y = Math.round(e.clientY - svgPos.top);

      arrayCopy[this.state.currentDragger] = itemCopy;
      this.setState({pathData: arrayCopy});
    }
  },

  render: function() {

    var that = this;

    var d = this.state.pathData.map(function(v) {
      if(v.cmd == 'L' || v.cmd == 'M') return v.cmd + ' ' + v.x + ' ' + v.y;
      if(v.cmd == 'Z') return v.cmd;
    }).join(' ');

    var draggerStyles = {
      fillOpacity: 0.1,
      fill: '#E1B000',
      stroke: '#E1B000',
      strokeWidth: 2,
      cursor: 'move',
      pointerEvents: 'all'
    }

    var draggers = [];
    for(var i = 0; i < this.state.pathData.length; i++) {
      var p = this.state.pathData[i];
      if(p.x) {
        draggers.push(<circle key={'dragger'+i} style={draggerStyles} className='animate-blink' cx={p.x} cy={p.y} r="10" onMouseDown={this.startDrag.bind(this, i)} />);
      }
    }

    var styles = {
      backgroundColor: '#ffffdc'
    }

    var code = 'beginShape();\n';
    for(var i = 0; i < this.state.pathData.length; i++) {
      var v = this.state.pathData[i];
      if(v.cmd == 'L' || v.cmd == 'M') code += '  vertex(' + v.x + ', ' + v.y + ');\n';
      if(v.cmd == 'Z') code += 'endShape(CLOSE)';
    }

    return (
      <div>
        <svg style={styles} width="500" height="500" onMouseMove={this.mouseMoved} onMouseUp={this.mouseUp}>
          <path d={d}></path>
          {draggers}
        </svg>
        <pre><code>{code}</code></pre>
    </div>
    )
  }

});
