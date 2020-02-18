'use strict';

window.backend = (function () {
  var SAVE_URL = 'https://js.dump.academy/code-and-magick';
  var LOAD_URL = 'https://js.dump.academy/code-and-magick/data';
  var statusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    REQUEST_TIMEOUT: 408,
    FORBIDDEN: 403,
    SERVER_ERROR: 500,
    SERVER_UNAVAILABLE: 503,
    SERVER_OFF: 521
  };
  var TIMEOUT_IN_MS = 10000; // 10 s;

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case statusCode.OK:
          onLoad(xhr.response);
          break;
        case statusCode.BAD_REQUEST:
          onError('Ошибка: неверный запрос к серверу');
          break;
        case statusCode.REQUEST_TIMEOUT:
          onError('Ошибка: время ожидания истекло');
          break;
        case statusCode.FORBIDDEN:
          onError('Ошибка: доступ запрещен');
          break;
        case statusCode.SERVER_ERROR:
          onError('Ошибка сервера');
          break;
        case statusCode.SERVER_UNAVAILABLE:
          onError('Ошибка: сервер веременно недоступен');
          break;
        case statusCode.SERVER_OFF:
          onError('Ошибка: сервер недоступен');
          break;
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('POST', SAVE_URL);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case statusCode.OK:
          onLoad(xhr.response);
          break;
        case statusCode.BAD_REQUEST:
          onError('Ошибка: неверный запрос к серверу');
          break;
        case statusCode.NOT_FOUND:
          onError('Ошибка: такой информации не существует');
          break;
        case statusCode.REQUEST_TIMEOUT:
          onError('Ошибка: время ожидания истекло');
          break;
        case statusCode.FORBIDDEN:
          onError('Ошибка: доступ запрещен');
          break;
        case statusCode.SERVER_ERROR:
          onError('Ошибка сервера');
          break;
        case statusCode.SERVER_UNAVAILABLE:
          onError('Ошибка: сервер веременно недоступен');
          break;
        case statusCode.SERVER_OFF:
          onError('Ошибка: сервер недоступен');
          break;
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  return {
    save: save,
    load: load
  };

})();
