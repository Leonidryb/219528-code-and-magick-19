'use strict';

(function () {

  var setup = document.querySelector('.setup');
  var setupPlayerElement = setup.querySelector('.setup-player');
  var setupWizardFormElement = document.forms['setup-wizard-form'];


  var onWizardCoatClick = function () {
    var wizardCoatColor = setupPlayerElement.querySelector('.wizard-coat').style.fill = window.util.getRandomElement(window.data.coatColors);
    setupWizardFormElement['coat-color'].value = wizardCoatColor;
  };

  var onWizardEyesClick = function () {
    var wizardEyesColor = setupPlayerElement.querySelector('.wizard-eyes').style.fill = window.util.getRandomElement(window.data.eyeColors);
    setupWizardFormElement['eyes-color'].value = wizardEyesColor;
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
    });
    evt.preventDefault();
  });

})();
