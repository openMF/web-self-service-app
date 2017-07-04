(function () {
    'use strict';
    //@todo Move this service to the common folder
    angular.module('selfService')
        .service('AccountService', ['$q', '$http', '$rootScope', '$resource', 'BASE_URL', 'storageService', AccountService]);

    function AccountService($q, $http, $rootScope, $resource, BASE_URL, storageService) {

        /**
         * Get the clients associated with the current user's account.
         *
         */
        this.getClients = function () {
            return $resource(BASE_URL + '/self/clients/');
        };

        this.getAllAccounts = function (clientId) {//@todo rename this getClientAccounts
            //@todo update this to return $resource(BASE_URL+'/self/clients/'+id+'/accounts'); and test
            return $resource(BASE_URL + '/self/clients/' + clientId + '/accounts');
        };

        this.getClient = function (id) {
            return $resource(BASE_URL + '/self/clients/' + id);
        }

        this.getClientImage = function (id) {
            return $resource(BASE_URL + '/self/clients/' + id + '/images');
        }

        this.getClientCharges = function (id) {
            return $resource(BASE_URL + '/self/clients/' + id + '/charges?pendingPayment=true');
        }

        this.getClientAccounts = function (id) {
            return $resource(BASE_URL + '/self/clients/' + id + '/accounts');
        }

        this.getLoanAccount = function (id) {
            return $resource(BASE_URL + '/self/loans/' + id);
        }

        this.setClientId = function (id) {
            storageService.setObject('client_id', id);
        }

        this.getClientId = function () {
            return storageService.getItem('client_id');
        }

    }

})();
