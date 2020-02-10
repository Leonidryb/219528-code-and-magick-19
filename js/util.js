'use strict';

window.util = (function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  return {
    getRandomElement: function (elements) {
      var random = Math.floor(Math.random() * elements.length);
      return elements[random];
    },
    isEscEvent: function (evt, action) {
      if (evt.key === ESC_KEY) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.key === ENTER_KEY) {
        action();
      }
    }
  };

})();
