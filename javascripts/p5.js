// Shows a P5 is a sandboxed iframe.
// --------------------------------------------

function P5toFig(el) {

  var placeholder, iframe;

  // Grab the size of the sketch
  var code = el.innerHTML;
  var pattern = /createCanvas\((\d+),\s*(\d+)\)/
  var hasCanvas = code.match(pattern)
  if(!hasCanvas) console.warn('Example appears to not have a createCanvas function.');
  var sketchWidth = parseInt(hasCanvas[1]);
  var sketchHeight = parseInt(hasCanvas[2]);

  // Create a placeholder
  placeholder = document.createElement('div');
  placeholder.setAttribute('class', 'placeholder');
  setSize(placeholder);

  function setSize(box) {
    var ratio = el.parentNode.offsetWidth / sketchWidth;
    var w = Math.floor(sketchWidth * ratio);
    var h = Math.floor(sketchHeight * ratio);
    box.style.width = w + 'px';
    box.style.height = h + 'px';
    if(box.tagName === 'IFRAME') {
      var fitCode = code.replace(pattern, 'createCanvas('+w+','+h+');');
      box.setAttribute('srcdoc', '<html><head><script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.4.23/p5.js"></script><style>html,body{ margin:0; padding:0}</style></head><body><script type="text/javascript">' + fitCode + '</script></body></html>');
    }
  }

  // add placeholder next to script element
  el.parentNode.insertBefore(placeholder, el.nextSibling);

  // When placeholder is in window, replace with iframe
  lazyload(placeholder, function() {

    // Create an iframe. We have srcdoc polyfill for older browsers.
    iframe = document.createElement('iframe');
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('sandbox', 'allow-scripts');
    setSize(iframe);

    // replace placeholder with the real thing.
    placeholder.parentNode.replaceChild(iframe, placeholder);

  });

  // Resize placeholder or iframe when window resizes
  window.addEventListener('resizeEnd', function(e) {
    setSize(iframe || placeholder);
  });
}

// Init
// --------------------------------------------

(function() {

  window.onload = function() {

    // Convert P5 to figures with iframes
    var imgs = document.getElementsByClassName('p5 fig');
    for(var i = 0; i < imgs.length; i++) { P5toFig(imgs[i]); }

  }

})();
