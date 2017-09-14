(function () {
    'use strict';
    angular.module('selfService')
        .service('TransactionService', ['$q', '$http', '$rootScope', '$resource', 'BASE_URL', TransactionService]);

    function TransactionService($q, $http, $rootScope, $resource, BASE_URL) {

        this.getClientTransactions = function (clientId) {
            return $resource(BASE_URL + '/self/clients/' + clientId + '/transactions')
        }

    }

})();
