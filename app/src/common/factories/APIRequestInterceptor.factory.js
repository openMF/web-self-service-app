(function () {
    'use strict';

    angular.module('selfService')
        .factory('APIRequestInterceptor', ['$rootScope', '$q', APIRequestInterceptor]);

    function APIRequestInterceptor($rootScope, $q) {
        return {
            request: function(config) {
                $rootScope.blockUI = true;
                $rootScope.respERROR = null;
                return $q.resolve(config);
            },
            requestError: function (rejection) {
                $rootScope.blockUI = false;
                $rootScope.respERROR = null;
                return $q.reject(rejection);
            },
            response: function(response) {
                $rootScope.blockUI = false;
                $rootScope.respERROR = null;
                return $q.resolve(response);
            },
            responseError: function(response) {
                $rootScope.blockUI = false;
                $rootScope.respERROR = response;
                return $q.reject(response);
            }
        }
    }

})();
