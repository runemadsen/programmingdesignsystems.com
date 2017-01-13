var React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      areTogether: false,
      hasRun: false
    }
  },

  toggleBackground: function() {
    this.setState({ areTogether: !this.state.areTogether, hasRun: true });
  },

  render: function() {

    var btnStyles = {
      fontSize: 1.7,
      fill: 'white',
      WebkitFontSmoothing: 'antialiased',
      cursor: 'pointer',
      opacity: 0.8,
    }

    var r1Styles;
    var r2Styles;
    if(this.state.hasRun) {
      if(this.state.areTogether) {
        r1Styles = {
          transition : 'ease-out 1s',
          transform : 'translate(19px, 0)'
        }
        r2Styles = {
          transition : 'ease-out 1s',
          transform : 'translate(-19px, 0)'
        }
      } else {
        r1Styles = r2Styles = {
          transition : 'ease-out 1s',
          transform : 'translate(0, 0)'
        }
      }
    }

    var btnLabel = this.state.areTogether ? 'Reset Squares' : 'Compare Squares';

    return (
      <svg width="100%" viewBox="0 0 100 50" style={{backgroundColor:"#333333"}}>

        <rect x="0" y="0" width="50" height="50" fill="#5c2a43"/>
        <rect x="50" y="0" width="50" height="50" fill="#4f2f1b"/>

        <rect style={r1Styles} x="19" y="19" width="12" height="12" fill="#572f2f"/>
        <rect style={r2Styles} x="69" y="19" width="12" height="12" fill="#572f2f"/>

        <text x="50" y="4.5" style={btnStyles} textAnchor="middle" onClick={this.toggleBackground}>
          {btnLabel}
        </text>

      </svg>
    )
  }

});
