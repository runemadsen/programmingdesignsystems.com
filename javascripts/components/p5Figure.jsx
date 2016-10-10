var React = require('react');

// P5Figure
// Shows a P5 sketch in a sandboxed iframe
// --------------------------------------------

module.exports = React.createClass({

  getInitialState: function() {

    var regex = /createCanvas\((\d+),\s*(\d+)\)/;
    var hasCanvas = this.props.code.match(regex);
    if(!hasCanvas) console.warn('Example appears to not have a createCanvas function.');

    return {
      regex: regex,
      code: this.props.code,
      showSketch: true,
      codeWidth: parseInt(hasCanvas[1]),
      codeHeight: parseInt(hasCanvas[2]),
      parentWidth: this.getParentWidth()
    }
  },

  componentDidMount: function() {

    var that = this;

    // If we want lazyload, default state.showSketch to false
    //lazyload(this.state.parent, function() { that.setState({ showSketch: true }); });

    window.addEventListener('resizeEnd', function(e) {
      that.setState({ parentWidth: that.getParentWidth() });
    });

  },

  getParentWidth: function() {
    var computed = window.getComputedStyle(this.props.parent);
    return parseFloat(computed.width) - parseFloat(computed.paddingLeft) - parseFloat(computed.paddingRight);
  },

  getSketchHtml: function(w, h) {

    var link = '';
    if(this.props.link) {
      link += '<a href="https://github.com/runemadsen/programmingdesignsystems.com/tree/master/'+path+'">&lt;&gt;</a>';
    }

    var codeResized = this.props.code.replace(this.state.regex, 'createCanvas('+w+','+h+');');

    return '<html><head><base target="_parent" /><script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.4.23/p5.min.js"></script><style>html,body{ margin:0; padding:0} a{color:rgba(0,0,0,0.15); font-family:Courier New, sans-serif; text-decoration:none; position:absolute; top:10px; right:12px; letter-spacing:0.1em; font-weight: bold; font-size:0.9em}</style></head><body><script type="text/javascript">' + codeResized + '</script>'+link+'</body></html>';
  },

  render: function() {

    var resizeRatio = this.state.parentWidth / this.state.codeWidth;
    var resizeWidth = Math.floor(this.state.codeWidth * resizeRatio);
    var resizeHeight = Math.floor(this.state.codeHeight * resizeRatio);
    var srcdoc = this.state.showSketch ? this.getSketchHtml(resizeWidth, resizeHeight) : '<html><body></body></html>';
    var styles = { width: resizeWidth, height: resizeHeight }

    var klass = this.props.klass;
    if(this.state.showSketch) klass += ' placeholder';

    return (
      <iframe srcDoc={srcdoc}
              style={styles}
              className={klass}
              scrolling="no"
              sandbox="allow-scripts allow-top-navigation">
      </iframe>
    )
  }

});
