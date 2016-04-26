// Shows a P5 is a sandboxed iframe.
// --------------------------------------------

function P5toFig(el) {

  var loaded = false;

  // Grab the size of the sketch
  var code = el.innerHTML;
  var pattern = /createCanvas\((\d+),\s*(\d+)\)/
  var hasCanvas = code.match(pattern)
  if(!hasCanvas) console.warn('Example appears to not have a createCanvas function.');
  var sketchWidth = parseInt(hasCanvas[1]);
  var sketchHeight = parseInt(hasCanvas[2]);

  // function to set or update the iframe and sketch size
  function setSize(iframe, updateSketch) {

    var ratio = el.parentNode.offsetWidth / sketchWidth;
    var w = Math.floor(sketchWidth * ratio);
    var h = Math.floor(sketchHeight * ratio);
    var ws = w + 'px';
    var hs = h + 'px';

    if(iframe.style.width !== ws || iframe.style.height !== hs) {
      iframe.style.width = ws;
      iframe.style.height = hs;
    }

    if(updateSketch) {
      var fitCode = code.replace(pattern, 'createCanvas('+w+','+h+');');
      iframe.setAttribute('srcdoc', '<html><head><script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.4.23/p5.js"></script><style>html,body{ margin:0; padding:0}</style></head><body><script type="text/javascript">' + fitCode + '</script></body></html>');
    }
  }

  // Create iframe as placeholder and insert next to script
  var iframe = document.createElement('iframe');
  iframe.setAttribute('class', 'placeholder');
  iframe.setAttribute('scrolling', 'no');
  iframe.setAttribute('sandbox', 'allow-scripts');
  setSize(iframe);
  el.parentNode.insertBefore(iframe, el.nextSibling);

  // When placeholder is in window, replace with iframe
  lazyload(iframe, function() {
    loaded = true;
    setSize(iframe, true);
  });

  // Resize placeholder or iframe when window resizes
  window.addEventListener('resizeEnd', function(e) {
    setSize(iframe, loaded);
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
