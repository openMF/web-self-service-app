(function(){
  'use strict';

  angular.module('selfService')
    .service('storageService', ['$q', storageService]);

  function storageService($q){

    return {
        getItem: function (key) {
            return $q.when(window.sessionStorage.getItem(key));
        },
        setItem: function (key, value) {
            window.sessionStorage.setItem(key, value);
        },
        getObject: function (key) {
            return $q.when(JSON.parse(window.sessionStorage.getItem(key)));
        },
        setObject: function (key, value) {
            value = JSON.stringify(value);
            window.sessionStorage.setItem(key, value);
        },
        clear: function () {
            window.sessionStorage.clear();
        }
    };
  }

})();