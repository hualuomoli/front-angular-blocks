(function () {
  'use strict';

  // start with
  String.prototype.startsWith = function (str) {
    return validat(this, str) && this.substring(0, str.length) === str;
  }

  // end with
  String.prototype.endsWith = function (str) {
    return validat(this, str) && this.substring(this.length - str.length) === str;
  }

  // contain
  String.prototype.contains = function (str) {
    return validat(this, str) && this.indexOf(str) >= 0;
  }

  // join other path to this
  String.prototype.joinPath = function (str) {
    var s = this;
    if (s === '') {
      return str;
    }
    if (!this.endsWith('/') && !this.endsWith('\\')) {
      s += '/';
    }
    if (str.startsWith('/') || str.startsWith('\\')) {
      s += str.substring(1);
    } else {
      s += str;
    }
    return s;
  }

  // get file suffix
  String.prototype.getFileSuffix = function () {
    var str = this;
    if (str === undefined || str.length === 0) {
      return '';
    }
    var index = str.indexOf('.');
    if (index === -1) {
      return '';
    }
    return str.substring(index + 1);
  }

  // get file name
  String.prototype.getFileName = function () {
    var str = this;
    if (str === undefined || str.length === 0) {
      return '';
    }
    var index = str.indexOf('.');
    if (index === -1) {
      return '';
    }
    return str.substring(0, index);
  }

  // base64 to image
  String.prototype.base64ToImage = function (filename) {

    var base64 = this;

    var bytes = window.atob(base64.split(',')[1]); //去掉url的头，并转换为byte
    //处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }

    var type = 'image/' + filename.getFileSuffix;

    var blob = new Blob([ab], {
      type: type
    });

    blob.name = filename;

    return blob;
  }

  function validat(data, str) {
    if (!data || !str) {
      return false;
    }
    if (data.length < str.length) {
      return false;
    }
    return true;
  }

})();
(function () {
  'use strict';

  angular.module('blocks.exception', [
    // blocks
    'blocks.logger'
  ]);

})();
(function () {
  'use strict';

  angular.module('blocks.http', [
    'blocks.logger'
  ]);

})();
(function () {
  'use strict';

  // logger
  angular.module('blocks.logger', []);

})();
(function () {
  'use strict';

  angular.module('blocks.routehelper', [
    // blocks
    'blocks.logger',
    // assets
    'ui.router'
  ]);

})();
(function () {
  'use strict';

  angular.module('blocks.user', [
    'blocks.logger'
  ]);

})();
(function () {
  'use strict';

  angular.module('blocks.exception')
    .provider('exceptionHandler', exceptionHandlerProvider);

  function exceptionHandlerProvider() {
    /* jshint validthis:true */
    this.config = {
      appErrorPrefix: 'front-' // error log's prefix
    };

    this.$get = function () {
      return {
        config: this.config
      };
    };
  }

})();
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
(function () {
  'use strict';

  angular.module('blocks.user')
    .provider('userHandler', userHandlerProvider);

  function userHandlerProvider() {
    /* jshint validthis:true */
    this.config = {
      status: { // 返回状态码
        Unauthorized: 401 // 没有权限
      },
      erroCode: { // 返回错误码
        nologin: '9999', // 未登录
        overtime: '9998', // 登录超时
      }
    }

    this.$get = function () {
      return {
        config: this.config
      }
    }
  }

})();
(function () {
  'use strict';

  http.$inject = ["$http", "logger", "httpHandler"];
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
        return get(uri, params, headers);
      case 'POST':
      case 'post':
        return post(uri, params, headers);
      case 'DELETE':
      case 'DEL':
      case 'delete':
      case 'del':
        return del(uri, params, headers);
      case 'PUT':
      case 'put':
        return put(uri, params, headers);
      default:
        throw new Error('there is can not constant methodName ' + methodName);
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
      if (httpHandler.config.baseUrl === '') {
        return uri;
      }
      if (uri.startsWith('http://') || uri.startsWith('https://')) {
        return uri;
      }
      return httpHandler.config.baseUrl.joinPath(uri);
    }

  }

})();
(function () {
  'use strict';

  logger.$inject = ["$log"];
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
(function () {
  'use strict';

  routehelper.$inject = ["$rootScope", "logger"];
  angular.module('blocks.routehelper')
    .factory('routehelper', routehelper);

  /* @ngInject */
  function routehelper($rootScope, logger) {

    return {
      'init': init
    };

    ///////////////

    function init() {
      stateChangeError();
      stateChangeSuccess();
      stateNotFound();
    }

    function stateChangeError() {
      $rootScope.$on('$stateChangeError',
        function (event, toState, toParams, fromState) {
          logger.error('change state error.', [fromState, toState]);
          // $location.path(routePath);
        }
      );
    }

    function stateChangeSuccess() {
      $rootScope.$on('$stateChangeSuccess',
        function (event, toState) {
          logger.success('change state success. state = ', toState);
        }
      );
    }

    function stateNotFound() {
      $rootScope.$on('$stateNotFound',
        function (event, toState) {
          logger.warning('state not found. state = ', toState.to);
          logger.warning('state not found. params = ', toState.toParams);
        }
      );
    }
  }
})();
(function () {
  'use strict';

  config.$inject = ["$provide"];
  exceptionHandlerDecorator.$inject = ["$delegate", "exceptionHandler", "logger"];
  angular.module('blocks.exception')
    .config(config);

  /* @ngInject */
  function config($provide) {
    // add prefix to log message
    $provide.decorator('$exceptionHandler', exceptionHandlerDecorator);
  }

  /* @ngInject */
  function exceptionHandlerDecorator($delegate, exceptionHandler, logger) {
    var appErrorPrefix = exceptionHandler.config.appErrorPrefix;
    return function (exception, cause) {

      $delegate(exception, cause);

      var errorData = {
        exception: exception,
        cause: cause
      };
      exception.message = appErrorPrefix + exception.message;
      logger.error(exception.message, errorData);
    };
  }

})();
(function () {
  'use strict';

  userInterceptor.$inject = ["$q", "$rootScope", "userHandler"];
  angular.module('blocks.user')
    .factory('userInterceptor', userInterceptor);

  /** ngInject */
  function userInterceptor($q, $rootScope, userHandler) {
    return {
      // responseSuccess: function (res) {
      //   console.log('success');
      //   console.log(res);
      //   return $q.resolve(res);
      // },
      responseError: function (res) {

        switch (res.status) {
          // 没有权限
        case userHandler.config.status.Unauthorized:
          switch (res.data.code) {
          case userHandler.config.erroCode.nologin: // 没有登录
            $rootScope.$emit("userUnauthorizedIntercepted", "nologin", res.data, res);
            break;
          case userHandler.config.erroCode.overtime: // 登录超时
            $rootScope.$emit("userUnauthorizedIntercepted", "overtime", res.data, res);
            break;
          default: // 未知
            $rootScope.$emit("userUnauthorizedIntercepted", "unknown", res.data, res);
            break;
          }
          break;
          // 其他
        default:
          $rootScope.$emit("userIntercepted", res);
          break;
        }

        return $q.reject(res);
      }
    }

  }

})();