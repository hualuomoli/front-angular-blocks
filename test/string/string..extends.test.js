(function () {
  'use strict';

  describe('test string extends', function () {

    it('should use startsWith"', function () {

      expect('abcdefg'.startsWith('abcdefghigk')).toBe(false);
      expect('abcdefg'.startsWith(null)).toBe(false);
      var s;
      expect('abcdefg'.startsWith(s)).toBe(false);

      // startWith
      expect('abcdefg'.startsWith('abcd')).toBe(true);
      expect('abcdefg'.startsWith('bcd')).toBe(false);


    });


    it('should use endsWith"', function () {

      expect('abcdefg'.endsWith('efg')).toBe(true);
      expect('abcdefg'.endsWith('ef')).toBe(false);

    });

    it('should use contains"', function () {

      expect('abcdefg'.contains('abcd')).toBe(true);
      expect('abcdefg'.contains('bcd')).toBe(true);
      expect('abcdefg'.contains('efg')).toBe(true);

    });

    it('should join path"', function () {

      expect('http://localhost:3000'.joinPath('api/user')).toBe('http://localhost:3000/api/user');
      expect('http://localhost:3000'.joinPath('/api/user')).toBe('http://localhost:3000/api/user');
      expect('http://localhost:3000/'.joinPath('api/user')).toBe('http://localhost:3000/api/user');
      expect('http://localhost:3000/'.joinPath('/api/user')).toBe('http://localhost:3000/api/user');

    });


  });

})();