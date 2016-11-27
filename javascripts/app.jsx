// Setup custom events
var utils = require('./other/utils');
utils.setupCustomEvents();

// Manual Rendering
// -----------------------------------------------------

var p5 = window.p5 = require('p5');
var React = window.React = require('react');
var ReactDOM = window.ReactDOM = require('react-dom');
window.pds = {
  Splash: require('./other/splash'),
  PathInteractive: require('./components/pathInteractive')
};

// Automatic Rendering
// -----------------------------------------------------

// Run all examples
if(window.p5Examples) {
  for(var i = 0; i < p5Examples.length; i++) {
    // Run example in sync mode
    var node = document.getElementById(p5Examples[i][0]);
    var example = new p5(p5Examples[i][1], node, true);
    // Make it resizable
    example.canvas.style.width = "100%";
    example.canvas.style.height = "auto";
  }
}

// Highlight all pre tags
var Prism = require('prismjs');
var pres = document.getElementsByTagName('pre');
for(var i = 0; i < pres.length; i++) {
  pres[i].firstChild.innerHTML = Prism.highlight(pres[i].firstChild.textContent, Prism.languages.javascript)
}

// Dispatch an event to say that libs are loaded. This makes it
// possible to have view-specific JS before the loaded libs.
window.dispatchEvent(new Event('libsLoaded'));
