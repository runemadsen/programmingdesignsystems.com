var React = require('react');
var Prism = require('prismjs');
var utils = require('../other/utils');

module.exports = React.createClass({

  getInitialState: function() {

    return {
      hasDragged: false,
      codeWidth: 500,
      codeHeight: 400,
      currentDragger: null,
      pathData: [
        { cmd: 'M', x: 120, y: 80 },
        { cmd: 'L', x: 400, y: 100 },
        { cmd: 'L', x: 350, y: 270 },
        { cmd: 'L', x: 160, y: 330 },
        { cmd: 'Z' }
      ]
    }
  },

  startDrag: function(i) {
    this.setState({ currentDragger: i, hasDragged: true });
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
      itemCopy.x = ((e.clientX - svgPos.left) / svgPos.width) * this.state.codeWidth;
      itemCopy.y = ((e.clientY - svgPos.top) / svgPos.height) * this.state.codeHeight;

      arrayCopy[this.state.currentDragger] = itemCopy;
      this.setState({pathData: arrayCopy});
    }
  },

  render: function() {

    var that = this;

    var svgStyles = {
      backgroundColor: '#ffffdc'
    }

    var draggerStyles = {
      fillOpacity: 0.1,
      fill: '#E1B000',
      stroke: '#E1B000',
      strokeWidth: 2,
      cursor: 'move',
      pointerEvents: 'all'
    }

    var helperStyles = {
      fontSize: 12,
      fill: '#E1B000',
      stroke: 'none'
    }

    var d = this.state.pathData.map(function(v) {
      if(v.cmd == 'L' || v.cmd == 'M') return v.cmd + ' ' + v.x + ' ' + v.y;
      if(v.cmd == 'Z') return v.cmd;
    }).join(' ');

    var draggers = [];
    for(var i = 0; i < this.state.pathData.length; i++) {
      var p = this.state.pathData[i];
      if(p.x) {
        draggers.push(<circle key={'dragger'+i} style={draggerStyles} className='dragger animate-blink' cx={p.x} cy={p.y} r="8" onMouseDown={this.startDrag.bind(this, i)} />);
      }
    }

    // Code has pixels relative to viewport, even though resized.
    // Will this confuse the reader?
    var code = 'beginShape();\n';
    for(var i = 0; i < this.state.pathData.length; i++) {
      var v = this.state.pathData[i];
      if(v.cmd == 'L' || v.cmd == 'M') code += '  vertex(' + Math.round(v.x) + ', ' + Math.round(v.y) + ');\n';
      if(v.cmd == 'Z') code += 'endShape(CLOSE)';
    }
    code = Prism.highlight(code, Prism.languages.javascript)

    var helperText = this.state.hasDragged ? null : <text x={this.state.pathData[0].x - 10} y={this.state.pathData[0].y - 20} style={helperStyles} className="animate-blink">Drag vertices to change code</text>;

    return (
      <div className="two-grid">
        <div className="col two-thirds">
          <svg style={svgStyles} width="100%" viewBox={'0 0 ' + this.state.codeWidth + ' ' + this.state.codeHeight} onMouseMove={this.mouseMoved} onMouseUp={this.mouseUp}>
            <path d={d}></path>
            {draggers}
            {helperText}
          </svg>
        </div>
        <div className="col one-third">
          <pre className="no-margin"><code dangerouslySetInnerHTML={{__html:code}} /></pre>
        </div>
      </div>
    )
  }

});
