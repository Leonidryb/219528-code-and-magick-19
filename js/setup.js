'use strict';

window.setup = (function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var wizardCoatColor;
  var wizardEyesColor;

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === wizardCoatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === wizardEyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.data.renderWizards(window.backend.wizardsList.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var setup = document.querySelector('.setup');
  var setupPlayerElement = setup.querySelector('.setup-player');
  var setupWizardFormElement = document.forms['setup-wizard-form'];


  var onWizardCoatClick = function () {
    wizardCoatColor = setupPlayerElement.querySelector('.wizard-coat').style.fill = window.util.getRandomElement(window.data.coatColors);
    setupWizardFormElement['coat-color'].value = wizardCoatColor;
    window.optimization.debounce(updateWizards);
  };

  var onWizardEyesClick = function () {
    wizardEyesColor = setupPlayerElement.querySelector('.wizard-eyes').style.fill = window.util.getRandomElement(window.data.eyeColors);
    setupWizardFormElement['eyes-color'].value = wizardEyesColor;
    window.optimization.debounce(updateWizards);
  };

  var onFireBallClick = function () {
    var colorFireBall = setupPlayerElement.querySelector('.setup-fireball-wrap').style.backgroundColor = window.util.getRandomElement(window.data.fireballColors);
    setupWizardFormElement['fireball-color'].value = colorFireBall;
  };

  setupPlayerElement.querySelector('.wizard-coat').addEventListener('click', onWizardCoatClick);
  setupPlayerElement.querySelector('.wizard-eyes').addEventListener('click', onWizardEyesClick);
  setupPlayerElement.querySelector('.setup-fireball-wrap').addEventListener('click', onFireBallClick);

  var userNameInput = setup.querySelector('.setup-user-name');

  userNameInput.addEventListener('input', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Это обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  // Работаем с отправкой формы на сервер
  setupWizardFormElement.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(setupWizardFormElement), function () {
      setup.classList.add('hidden');
    }, window.data.onError);
    evt.preventDefault();
  });

  // Работаем с изменением аватара
  var fileChooser = setupWizardFormElement['avatar'];
  var preview = setup.querySelector('.setup-user-pic');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  return {
    updateWizards: updateWizards
  };

})();
