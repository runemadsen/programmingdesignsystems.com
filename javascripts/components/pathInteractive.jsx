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
      currentControl: null,
      pathData: this.props.pathData
    }
  },

  startDrag: function(i, ci) {
    this.setState({ currentDragger: i, currentControl:ci, hasDragged: true });
  },

  mouseUp: function(el) {
    if(this.state.currentDragger != null) {
      this.setState({ currentDragger: null, currentControl: null });
    }
  },

  mouseMoved: function(e) {

    if(this.state.currentDragger != null) {
      var arrayCopy = this.state.pathData.slice();
      var itemCopy = Object.assign({}, arrayCopy[this.state.currentDragger]);

      var svgPos = e.currentTarget.getBoundingClientRect();
      var newX = ((e.clientX - svgPos.left) / svgPos.width) * this.state.codeWidth;
      var newY = ((e.clientY - svgPos.top) / svgPos.height) * this.state.codeHeight;
      if(this.state.currentControl == 1) {
        itemCopy.cx = newX;
        itemCopy.cy = newY;
      } else if(this.state.currentControl == 2) {
        itemCopy.c2x = newX;
        itemCopy.c2y = newY;
      } else {
        itemCopy.x = newX;
        itemCopy.y = newY;
      }

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
      fontSize: 13,
      fill: '#E1B000',
      stroke: 'none'
    }

    var d = this.state.pathData.map(function(v) {
      if(v.cmd == 'L' || v.cmd == 'M') return v.cmd + ' ' + v.x + ' ' + v.y;
      else if(v.cmd == 'Q') return 'Q ' + v.cx + ' ' + v.cy + ' ' + v.x + ' ' + v.y;
      else if(v.cmd == 'C') return 'C ' + v.cx + ' ' + v.cy + ' ' + v.c2x + ' ' + v.c2y + ' ' + v.x + ' ' + v.y;
      else if(v.cmd == 'Z') return v.cmd;
    }).join(' ');

    function newDragger(x, y, r, key, fn) {
      return <circle key={key} style={draggerStyles} className='dragger animate-blink' cx={x} cy={y} r={r} onMouseDown={fn} />;
    }

    var els = [];
    for(var i = 0; i < this.state.pathData.length; i++) {
      var p = this.state.pathData[i];
      if(p.x) {
        els.push(newDragger(p.x, p.y, 10, 'd'+i, that.startDrag.bind(that, i)));
        if(p.cmd == 'C' || p.cmd == 'Q') els.push(newDragger(p.cx, p.cy, 6, 'dd'+i, that.startDrag.bind(that, i, 1)));
        if(p.cmd == 'C') els.push(newDragger(p.c2x, p.c2y, 6, 'ddd'+i, that.startDrag.bind(that, i, 2)));
      }
    }

    if(!this.state.hasDragged) {
      els.push(<text key="help" x={this.state.pathData[0].x - 10} y={this.state.pathData[0].y - 20} style={helperStyles} className="animate-blink">Drag vertices to change code</text>);
    }

    // Code has pixels relative to viewport, even though resized.
    // Will this confuse the reader?
    var code = 'beginShape();\n';
    for(var i = 0; i < this.state.pathData.length; i++) {
      var v = this.state.pathData[i];
      if(v.cmd == 'L' || v.cmd == 'M') code += '  vertex(' + Math.round(v.x) + ', ' + Math.round(v.y) + ');\n';
      else if(v.cmd == 'Q') code += '  curveVertex(' + Math.round(v.cx)  + ', ' + Math.round(v.cy)  + ', ' + Math.round(v.x)  + ', ' + Math.round(v.y) + ');\n';
      else if(v.cmd == 'C') code += '  curveVertex(' + Math.round(v.cx)  + ', ' + Math.round(v.cy)  + ', ' + Math.round(v.c2x)  + ', ' + Math.round(v.c2y)  + ', ' + Math.round(v.x) + ', ' + Math.round(v.y) + ');\n';
      else if(v.cmd == 'Z') code += 'endShape(CLOSE)';
    }
    code = Prism.highlight(code, Prism.languages.javascript)

    return (
      <div className="two-grid">
        <div className="col">
          <svg style={svgStyles} width="100%" viewBox={'0 0 ' + this.state.codeWidth + ' ' + this.state.codeHeight} onMouseMove={this.mouseMoved} onMouseUp={this.mouseUp}>
            <path d={d} fill="#303030"></path>
            {els}
          </svg>
        </div>
        <div className="col">
          <pre className="no-margin"><code dangerouslySetInnerHTML={{__html:code}} /></pre>
        </div>
      </div>
    )
  }

});
