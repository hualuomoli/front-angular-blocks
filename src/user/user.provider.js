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