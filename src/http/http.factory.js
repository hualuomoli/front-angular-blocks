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
      put: put,
      call: call
    }

    function get(uri, params, headers) {

      return $http({
        method: 'GET',
        url: getBaseUrl(uri),
        params: params,
        headers: headers
      });
    }

    function post(uri, params, headers) {
      return $http({
        method: 'POST',
        url: getBaseUrl(uri),
        data: parseData(params),
        headers: angular.extend({}, httpHandler.config.urlencodedHeader, headers)
      });
    }

    function del(uri, params, headers) {
      return $http({
        method: 'DELETE',
        url: getBaseUrl(uri),
        params: params,
        headers: headers
      });
    }

    function put(uri, params, headers) {
      return $http({
        method: 'PUT',
        url: getBaseUrl(uri),
        data: parseData(params),
        headers: angular.extend({}, httpHandler.config.urlencodedHeader, headers)
      });
    }

    function call(methodName, uri, params, headers) {
      switch (methodName) {
      case 'GET':
      case 'get':
        get(uri, params, headers);
        break;
      case 'POST':
      case 'post':
        post(uri, params, headers);
        break;
      case 'DELETE':
      case 'DEL':
      case 'delete':
      case 'del':
        del(uri, params, headers);
        break;
      case 'PUT':
      case 'put':
        put(uri, params, headers);
        break;
      }
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