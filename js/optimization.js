'use strict';

window.optimization = (function () {
  var DEBOUNCE_INTERVAL = 500; // ms

  var lastTimeout;
  var debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  return {
    debounce: debounce
  };
})();
