(function(){
  'use strict';

    angular.module('selfService')
        .service('AccountService', ['$q', '$http', '$rootScope', '$resource', 'BASE_URL', AccountService]);

    function AccountService($q, $http, $rootScope, $resource, BASE_URL) {

        this.getAllAccounts = function(clientId) {
        	return $resource(BASE_URL+'/self/clients/'+clientId+'/accounts', clientId);
        };

        this.getClient = function(id) {
            return $resource(BASE_URL+'/self/clients/'+id);
        }

        this.getClientImage = function(id) {
            return $resource(BASE_URL+'/self/clients/'+id+'/images');
        }

        this.getClientCharges = function(id) {
            return $resource(BASE_URL+'/self/clients/'+id+'/charges?pendingPayment=true');
        }

        this.getClientAccounts = function(id) {
            return $resource(BASE_URL+'/self/clients/'+id+'/accounts');
        }

    }

})();