(function () {
    'use strict';
    angular.module('selfService')
        .service('ChargesService', ['$q', '$http', '$rootScope', '$resource', 'BASE_URL', ChargesService]);

    function ChargesService($q, $http, $rootScope, $resource, BASE_URL) {

        this.getClientCharges = function (clientId) {
            return $resource(BASE_URL + '/self/clients/' + clientId + '/charges')
        }

    }

})();
