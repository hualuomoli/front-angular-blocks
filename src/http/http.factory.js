(function () {
  'use strict';

  angular.module('blocks.http')
    .factory('http', http);

  /* @ngInject */
  function http($http, logger, httpHandler) {

    return {
      get: get,
      post: post,
      delete: del,
      put: put
    }

    function get(uri, params) {

      return $http({
        method: 'GET',
        url: getBaseUrl(uri),
        params: params
      });
    }

    function post(uri, params) {
      return $http({
        method: 'POST',
        url: getBaseUrl(uri),
        data: parseData(params),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    }

    function del(uri, params) {
      return $http({
        method: 'DELETE',
        url: getBaseUrl(uri),
        params: params
      });
    }

    function put(uri, params) {
      return $http({
        method: 'PUT',
        url: getBaseUrl(uri),
        data: parseData(params),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    }



    function parseData(params) {
      if (!params) {
        return '';
      }
      if (typeof params == 'string') {
        return params;
      }
      if (typeof params == 'object') {
        return $.param(params);
      }
      throw new Error('con\'t constant type ' + (typeof params));
    }

    function getBaseUrl(uri) {
      return httpHandler.config.baseUrl.joinPath(uri);
    }

  }

})();