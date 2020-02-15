'use strict';

window.data = (function () {
  // var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  // var WIZARDS_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  // var WIZARDS_COUNT = 4;

  // var createWizardsArray = function (countWizards) {
  //   var array = [];
  //   for (var i = 0; i < countWizards; i += 1) {
  //     array.push(
  //         {
  //           name: window.util.getRandomElement(WIZARDS_NAMES) + ' ' + window.util.getRandomElement(WIZARDS_SECOND_NAMES),
  //           coatColor: window.util.getRandomElement(COAT_COLORS),
  //           eyesColor: window.util.getRandomElement(EYE_COLORS)
  //         }
  //     );
  //   }
  //   return array;
  // };
  //
  // var wizards = createWizardsArray(WIZARDS_COUNT);

  var userDialog = document.querySelector('.setup');

  var similarListElement = userDialog.querySelector('.setup-similar-list');

  // userDialog.querySelector('.setup-similar').classList.remove('hidden');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content;
    // .querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  window.backend.load(function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  });

  // createWizardsList();

  return {
    coatColors: COAT_COLORS,
    eyeColors: EYE_COLORS,
    fireballColors: FIREBALL_COLORS
  };
})();
