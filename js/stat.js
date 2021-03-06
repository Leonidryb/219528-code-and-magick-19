'use strict';
(function () {

  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 50;
  var FONT_GAP = 15;
  var BAR_HEIGHT = 150;
  var BAR_WIDTH = 40;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
      maxElement = arr[i] > maxElement ? maxElement = arr[i] : maxElement = maxElement;
    }

    return maxElement;
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP / 5, CLOUD_Y + GAP / 5, 'rgba(0, 0 , 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

    var gradient = ctx.createLinearGradient(125, 0, 300, 0);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(1 / 6, 'orange');
    gradient.addColorStop(2 / 6, 'yellow');
    gradient.addColorStop(3 / 6, 'green');
    gradient.addColorStop(4 / 6, 'blue');
    gradient.addColorStop(5 / 6, 'indigo');
    gradient.addColorStop(1, 'violet');

    ctx.fillStyle = gradient;
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillText('Ура вы победили!', 125, 30);
    ctx.fillText('Список результатов:', 125, 50);

    var maxTime = getMaxElement(times);

    for (var i = 0; i < names.length; i++) {
      ctx.fillStyle = '#000000';
      ctx.fillText(names[i], CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, CLOUD_HEIGHT - GAP / 2);
      ctx.fillText(Math.trunc(times[i]), CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, CLOUD_HEIGHT - GAP - (BAR_HEIGHT * times[i] / maxTime));
      ctx.fillStyle = 'hsl(250, ' + (Math.random() * 100) + '%' + ' , 50%)';
      if (names[i] === 'Вы') {
        ctx.fillStyle = ' rgba(255, 0, 0, 1)';
      }
      ctx.fillRect(CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, CLOUD_HEIGHT - (GAP / 2) - FONT_GAP, BAR_WIDTH, CLOUD_Y - (BAR_HEIGHT * times[i] / maxTime));
    }
  };

})();
