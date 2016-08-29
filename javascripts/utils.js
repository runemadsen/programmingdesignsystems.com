// Script to check whether an element is in the viewport
// John Resig style.
function isElementInViewport(el, padding) {
  padding = padding || 0;
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= -padding &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + padding &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Simple lazyload that calls a function when the
// element is in the viewport.
function lazyload(el, cb) {

  var interval;

  function checkVisibility() {
    if (!isElementInViewport(el, 1000))return;
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

// Events
// ---------------------------------------------

(function() {

  // resizeEnd
  var resizeTimer;
  window.onresize = function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      window.dispatchEvent(new Event('resizeEnd'));
    }, 150);
  }

  // scrollEnd
  var scrollTimer;
  window.onscroll = function() {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function() {
      window.dispatchEvent(new Event('scrollEnd'));
    }, 150);
  }


})();
