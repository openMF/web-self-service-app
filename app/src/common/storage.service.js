(function(){
  'use strict';

  angular.module('selfService')
    .service('storageService', ['$q', storageService]);

  function storageService($q){

    return {
        getItem: function (key) {
            return $q.when(window.localStorage.getItem(key));
        },
        setItem: function (key, value) {
            window.localStorage.setItem(key, value);
        },
        getObject: function (key) {
            return $q.when(JSON.parse(window.localStorage.getItem(key)));
        },
        setObject: function (key, value) {
            value = JSON.stringify(value);
            window.localStorage.setItem(key, value);
        },
        clear: function () {
            window.localStorage.clear();
        }
    };
  }

})();