(function () {
  'use strict';

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