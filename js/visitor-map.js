/**
 * Ensure the Clustrmaps-injected globe is targeted for centering.
 * The script injects a div or iframe after the clstr_globe script; we mark it so CSS can style it.
 */
(function () {
  var wrap = document.querySelector('.visitor-map-inner');
  if (!wrap) return;

  var fallback = document.getElementById('visitor-map-fallback');

  function findGlobe(script) {
    var children = Array.prototype.slice.call(wrap.children);
    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      if (child !== script && child !== fallback) return child;
    }
    return null;
  }

  function markGlobe() {
    var script = document.getElementById('clstr_globe');
    if (!script) return;
    var globe = findGlobe(script);
    if (globe) {
      if (!globe.classList.contains('visitor-map-globe')) {
        globe.classList.add('visitor-map-globe');
      }
      if (fallback) fallback.hidden = true;
      return true;
    }
    return false;
  }

  function showFallback() {
    if (!markGlobe() && fallback) {
      fallback.hidden = false;
      fallback.textContent = 'Visitor map temporarily unavailable.';
    }
  }

  markGlobe();
  setTimeout(markGlobe, 500);
  setTimeout(markGlobe, 2000);
  setTimeout(showFallback, 4000);
})();
