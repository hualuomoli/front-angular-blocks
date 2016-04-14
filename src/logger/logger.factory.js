(function () {
  'use strict';

  angular.module('blocks.logger')
    .factory('logger', logger);

  /* @ngInject */
  function logger($log) {
    return {
      success: success,
      log: log,
      debug: debug,
      info: info,
      warn: warn,
      error: error,
    };

    /////////////////////

    function success(message, data) {
      $log.info('Success: ' + message, data);
    }

    function log(message, data) {
      $log.log('Log: ' + message, data);
    }

    function debug(message, data) {
      $log.debug('Debug: ' + message, data);
    }

    function info(message, data) {
      $log.info('Info: ' + message, data);
    }

    function warn(message, data) {
      $log.warn('Warning: ' + message, data);
    }

    function error(message, data) {
      $log.error('Error: ' + message, data);
    }
  }
})();