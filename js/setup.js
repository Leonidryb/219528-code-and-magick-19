'use strict';

var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_COUNT = 4;
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var getRandomElement = function (elements) {
  var random = Math.floor(Math.random() * elements.length);
  return elements[random];
};

var createWizardsArray = function (countWizards) {
  var array = [];
  for (var i = 0; i < countWizards; i += 1) {
    array.push(
        {
          name: getRandomElement(WIZARDS_NAMES) + ' ' + getRandomElement(WIZARDS_SECOND_NAMES),
          coatColor: getRandomElement(COAT_COLORS),
          eyesColor: getRandomElement(EYE_COLORS)
        }
    );
  }
  return array;
};

var wizards = createWizardsArray(WIZARDS_COUNT);

var userDialog = document.querySelector('.setup');
// userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

userDialog.querySelector('.setup-similar').classList.remove('hidden');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var createWizardsList = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

createWizardsList();

// ---------------------------------Работа с событиями--------------------//

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

var userNameInput = setup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function () {
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

userNameInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

userNameInput.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});

// Реализовываем настройку мага

var setupPlayerElement = setup.querySelector('.setup-player');
var setupWizardFormElement = document.forms['setup-wizard-form'];

var onWizardCoatClick = function () {
  var wizardCoatColor = setupPlayerElement.querySelector('.wizard-coat').style.fill = getRandomElement(COAT_COLORS);
  setupWizardFormElement['coat-color'].value = wizardCoatColor;
};

var onWizardEyesClick = function () {
  var wizardEyesColor = setupPlayerElement.querySelector('.wizard-eyes').style.fill = getRandomElement(EYE_COLORS);
  setupWizardFormElement['eyes-color'].value = wizardEyesColor;
};

var onFireBallClick = function () {
  var colorFireBall = setupPlayerElement.querySelector('.setup-fireball-wrap').style.backgroundColor = getRandomElement(FIREBALL_COLORS);
  setupWizardFormElement['fireball-color'].value = colorFireBall;
};

setupPlayerElement.querySelector('.wizard-coat').addEventListener('click', onWizardCoatClick);
setupPlayerElement.querySelector('.wizard-eyes').addEventListener('click', onWizardEyesClick);
setupPlayerElement.querySelector('.setup-fireball-wrap').addEventListener('click', onFireBallClick);
