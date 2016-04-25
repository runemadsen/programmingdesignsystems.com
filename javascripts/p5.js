function P5toFig(el) {

  // Setup basic variables to use in iframe
  var code = el.innerHTML;
  var version = el.getAttribute('data-p5-version');
  var p5link = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.4.23/p5.js';
  var before = '<html><head><script type="text/javascript" src="'+p5link+'"></script><style>html,body{ margin:0; padding:0}</style></head><body><script type="text/javascript">';
  var after = '</script></body></html>';

  // Based on the parent element width, find the width and height
  // that the canvas should display. Also update the createCanvas function
  // with this new size. This means that all sketches should use the width
  // and height to draw items.
  var pattern = /createCanvas\((\d+),\s*(\d+)\)/
  var hasCanvas = code.match(pattern)
  if(!hasCanvas) console.warn('Example appears to not have a createCanvas function.');
  var sketchWidth = parseInt(hasCanvas[1]);
  var sketchHeight = parseInt(hasCanvas[2]);

  // Create iframe to hold the P5 sketch. We have polyfill for
  // srcdoc for older browsers.
  var iframe = document.createElement('iframe');
  iframe.setAttribute('scrolling', 'no');
  iframe.setAttribute('sandbox', 'allow-scripts');

  function setSizeAttributes() {
    var ratio = el.parentNode.offsetWidth / sketchWidth;
    var w = Math.floor(sketchWidth * ratio);
    var h = Math.floor(sketchHeight * ratio);
    var fitCode = code.replace(pattern, 'createCanvas('+w+','+h+');');
    iframe.setAttribute('width', w);
    iframe.setAttribute('height', h);
    iframe.setAttribute('srcdoc', before + fitCode + after);
  }

  setSizeAttributes();

  // insert iframe after el
  el.parentNode.insertBefore(iframe, el.nextSibling);

  // Set size attributes again when the window is done resizing.
  window.addEventListener('resizeEnd', function(e) {
    setSizeAttributes();
  });

  // TODO: Lazyload
}


(function() {

  // Convert P5 to figures with iframes
  var imgs = document.getElementsByClassName('p5 fig');
  for(var i = 0; i < imgs.length; i++) { P5toFig(imgs[i]); }

})();
