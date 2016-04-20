(function() {

  // find all p5img on the page
  var elements = document.getElementsByClassName('p5img');

  // Convert them all to iframes with srcdoc. We have polyfill
  // for the browsers that don't support srcdoc.
  for(var i = elements.length-1; i >= 0; i--) {

    // Setup basic variables
    var el = elements[i];
    var code = el.innerHTML;
    var version = el.getAttribute('data-p5-version');
    var p5link = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/' + version + '/p5.js';
    var w = parseInt(el.getAttribute('data-width'));
    var h = parseInt(el.getAttribute('data-height'));

    // TODO: Based on parent width, recalculate the dimension.

    // TODO: On resize, recalculate and redraw

    // TODO: Lazyload

    // create iframe
    var iframe = document.createElement('iframe');
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('width', w);
    iframe.setAttribute('height', h);
    iframe.setAttribute('sandbox', 'allow-scripts');
    iframe.setAttribute('srcdoc', '<html><head><script type="text/javascript" src="'+p5link+'"></script><style>html,body{ margin:0; padding:0}</style></head><body><script type="text/javascript">'+code+'</script></body></html>');

    // replace script tag with iframe
    el.parentNode.replaceChild(iframe, el);
  }

})();
