(function () {
  'use strict';

  describe('test http', function () {

    var http;
    var $httpBackend;

    // 模拟我们的Application模块并注入我们自己的依赖
    beforeEach(angular.mock.module('blocks.http'));

    // 获取工具，通过inject获取
    beforeEach(angular.mock.inject(function (httpHandler, _$httpBackend_, _http_) {

      http = _http_;
      $httpBackend = _$httpBackend_;

      httpHandler.config.baseUrl = 'http://localhost:3000';


      $httpBackend.expectGET('http://localhost:3000/demo/query').respond("ok");
      $httpBackend.expectGET('http://localhost:3000/demo/query?username=hualuomoli').respond("ok");

      $httpBackend.expectPOST('http://localhost:3000/demo/post').respond("success");
      $httpBackend.expectPOST('http://localhost:3000/demo/post', 'username=hualuomoli&token=1234567890').respond("success");


      $httpBackend.expectDELETE('http://localhost:3000/demo/del').respond("delete");
      $httpBackend.expectDELETE('http://localhost:3000/demo/del?id=1').respond("delete");

      $httpBackend.expectPUT('http://localhost:3000/demo/put').respond("puted");
      $httpBackend.expectPUT('http://localhost:3000/demo/put', 'username=hualuomoli&gender=' + encodeURIComponent('男')).respond("puted");


    }));

    it('show use logger level', function () {

      http.get('/demo/query')
        .success(function (data) {
          expect(data).toBe('ok');
        });

      http.get('/demo/query', {
          "username": "hualuomoli"
        })
        .success(function (data) {
          expect(data).toBe('ok');
        });

      http.post('/demo/post')
        .success(function (data) {
          expect(data).toBe('success');
        });


      http.post('/demo/post', {
          username: 'hualuomoli',
          token: '1234567890'
        })
        .success(function (data) {
          expect(data).toBe('success');
        });


      http.delete('/demo/del')
        .success(function (data) {
          expect(data).toBe('delete');
        });

      http.delete('/demo/del', {
          "id": "1"
        })
        .success(function (data) {
          expect(data).toBe('delete');
        });

      http.put('/demo/put')
        .success(function (data) {
          expect(data).toBe('puted');
        });


      http.put('/demo/put', {
          username: 'hualuomoli',
          gender: '男'
        })
        .success(function (data) {
          expect(data).toBe('puted');
        });


      $httpBackend.flush();


    });


  });

})();