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