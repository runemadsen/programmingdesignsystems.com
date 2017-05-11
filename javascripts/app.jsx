// Setup custom events
var utils = require('./other/utils');
utils.setupCustomEvents();

// Manual Rendering
// -----------------------------------------------------

var p5 = window.p5 = require('p5');
var hsluv = window.hsluv = require('hsluv');
var React = window.React = require('react');
var ReactDOM = window.ReactDOM = require('react-dom');
window.pds = {
  PathInteractive: require('./components/PathInteractive'),
  Albers: require('./components/Albers'),
  RgbCube: require('./functions/RgbCube'),
  HsvlCylinder: require('./functions/HsvlCylinder')
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

var tocToggle = document.getElementById('tocToggle');
var toc = document.getElementById('tocContainer');
if(tocToggle && toc) {

  // Toggle TOC on click
  tocToggle.addEventListener('click', function(e) {
    e.preventDefault();
    if(toc.style.display == 'block') {
      toc.style.display = 'none';
      ga('send', 'event', 'toc', 'toggle', 'hide');
    }
    else {
      toc.style.display = 'block';
      ga('send', 'event', 'toc', 'toggle', 'show');
    }
  });

  // Highlight active TOC
  var as = document.querySelectorAll('#tocContainer a[href]');
  for(var i = 0; i < as.length; i++) {
    // link is the one where link is just index.html
    var realHref = as[i].getAttribute('href').split('#')[0];
    if(realHref == 'index.html') {
      as[i].setAttribute('class', 'color1');
    }
  }
}

// Track newsletter clicks
var newsletter = document.getElementById('newsletter');
if(newsletter) {
  newsletter.addEventListener('click', function() {
    ga('send', 'event', 'newsletter', 'click');
  });
}

// Dispatch an event to say that libs are loaded. This makes it
// possible to have view-specific JS before the loaded libs.
window.dispatchEvent(new Event('libsLoaded'));
