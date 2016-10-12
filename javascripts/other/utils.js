module.exports = {

  // Calling this function adds a few custom events
  // to be dispatched on the window.
  setupCustomEvents: function() {

    // Dispatch event when window stops resizing
    var resizeTimer;
    window.onresize = function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        window.dispatchEvent(new Event('resizeEnd'));
      }, 150);
    }
  },

  // Script to check whether element is in viewport
  // John Resig style.
  isElementInViewport: function(el, padding) {
    padding = padding || 0;
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= -padding &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + padding &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Simple lazyload that calls a function when the
  // element is in the viewport.
  lazyload: function(el, cb) {

    var interval;
    var that = this;

    function checkVisibility() {
      if (!that.isElementInViewport(el, 1000)) return;
      clearInterval(interval);
      window.removeEventListener('scroll', checkVisibility, false);
      window.removeEventListener('resize', checkVisibility, false);
      cb(el);
    }

    window.addEventListener('scroll', checkVisibility, false);
    window.addEventListener('resize', checkVisibility, false);
    interval = setInterval(checkVisibility, 2000); // fallback
    checkVisibility();
  }

};
