// Emit a resizeEnd event on window whenever it is done
// resizing.
(function() {
  var resizeTimer;
  window.onresize = function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      window.dispatchEvent(new Event('resizeEnd'));
    }, 250);
  }
})();
