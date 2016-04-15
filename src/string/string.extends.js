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