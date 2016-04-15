(function () {
  'use strict';

  angular.module('blocks.http')
    .provider('httpHandler', httpHandleProvider);

  /** @ngInject */
  function httpHandleProvider() {
    /* jshint validthis:true */
    this.config = {
      baseUrl: '', // baseUrl
      urlencodedHeader: { // http post urlencoded header
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    this.$get = function () {
      return {
        config: this.config
      }
    }

  }

})();