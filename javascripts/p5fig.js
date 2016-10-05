// Shows a P5 is a sandboxed iframe.
// --------------------------------------------

function P5toFig(el) {

  var loaded = false;

  // Grab the size of the sketch
  var code = el.innerHTML;
  var path = el.getAttribute('data-path');
  var pattern = /createCanvas\((\d+),\s*(\d+)\)/
  var hasCanvas = code.match(pattern)
  if(!hasCanvas) console.warn('Example appears to not have a createCanvas function.');
  var sketchWidth = parseInt(hasCanvas[1]);
  var sketchHeight = parseInt(hasCanvas[2]);

  // add any other classes to the iframe
  var iframeClass = 'placeholder';
  var extraClasses = el.className.replace('p5 fig', '').trim();
  if(extraClasses != '') iframeClass += ' ' + extraClasses;

  // function to set or update the iframe and sketch size
  function setSize(iframe, updateSketch) {

    // small hack to remove the padding from the width
    var computed = window.getComputedStyle(el.parentNode);
    var realWidth = parseFloat(computed.width) - parseFloat(computed.paddingLeft) - parseFloat(computed.paddingRight);
    var ratio = realWidth / sketchWidth;
    var w = Math.floor(sketchWidth * ratio);
    var h = Math.floor(sketchHeight * ratio);
    var ws = w + 'px';
    var hs = h + 'px';

    if(iframe.style.width !== ws || iframe.style.height !== hs) {
      iframe.style.width = ws;
      iframe.style.height = hs;
    }

    var link = '';
    if(path) {
      link += '<a href="https://github.com/runemadsen/programmingdesignsystems.com/tree/master/'+path+'">&lt;&gt;</a>';
    }

    if(updateSketch) {
      var fitCode = code.replace(pattern, 'createCanvas('+w+','+h+');');
      iframe.setAttribute('srcdoc', '<html><head><base target="_parent" /><script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.4.23/p5.js"></script><script type="text/javascript">console.log("inside")</script><style>html,body{ margin:0; padding:0} a{color:rgba(0,0,0,0.15); font-family:Courier New, sans-serif; text-decoration:none; position:absolute; top:10px; right:12px; letter-spacing:0.1em; font-weight: bold; font-size:0.9em}</style></head><body><script type="text/javascript">' + fitCode + '</script>'+link+'</body></html>');
    }
  }

  // Create iframe as placeholder and insert next to script
  var iframe = document.createElement('iframe');
  iframe.setAttribute('class', iframeClass);
  iframe.setAttribute('scrolling', 'no');
  iframe.setAttribute('sandbox', 'allow-scripts allow-top-navigation');
  setSize(iframe);
  el.parentNode.insertBefore(iframe, el.nextSibling);

  // When placeholder is in window, replace with iframe
  lazyload(iframe, function() {
    console.log('load')
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
