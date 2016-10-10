// Setup custom events
var utils = require('./other/utils');
utils.setupCustomEvents();

// Manual Rendering
// -----------------------------------------------------

var React = window.React = require('react');
var ReactDOM = window.ReactDOM = require('react-dom');
window.pds = {
  Splash: require('./other/splash')
};

// Automatic Rendering
// -----------------------------------------------------

// Find all <script> tags with .p5.fig
// Create a div next to it
// Create React components in that div with the code from <script>
var P5Figure = require('./components/p5Figure');
var tags = document.getElementsByClassName('p5 fig');
for(var i = 0; i < tags.length; i++) {
  var el = document.createElement('div');
  tags[i].parentNode.insertBefore(el, tags[i].nextSibling);
  var code = tags[i].innerHTML;
  var path = tags[i].getAttribute('data-path');
  var klass = tags[i].className.replace('p5', '').replace('fig', '').trim();
  window.ReactDOM.render(window.React.createElement(P5Figure, { code: code, path: path, klass: klass, parent:el }), el)
}
