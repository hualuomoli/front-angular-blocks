(function () {
  'use strict';

  angular.module('blocks.http')
    .provider('httpHandler', httpHandleProvider);

  /** @ngInject */
  function httpHandleProvider() {
    /* jshint validthis:true */
    this.config = {
      baseUrl: '', // baseUrl
    }

    this.$get = function () {
      return {
        config: this.config
      }
    }

  }

})();