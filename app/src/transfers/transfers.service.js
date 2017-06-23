(function () {
    'use strict';
    angular.module('selfService')
        .service('AccountTransferService', ['$q', '$http', '$rootScope', '$resource', 'BASE_URL', AccountTransferService]);

    function AccountTransferService($q, $http, $rootScope, $resource, BASE_URL) {

        this.getTransferTemplate = function () {
            return $resource(BASE_URL + '/self/accounttransfers/template');
        }

        this.transfer = function () {
            return $resource(BASE_URL + '/self/accounttransfers');
        }

    }

})();
