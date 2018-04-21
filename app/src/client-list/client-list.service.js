(function(){
  'use strict';

    angular.module('selfService')
        .service('ClientService', ['$q', '$http', '$rootScope', '$resource', 'BASE_URL', ClientService]);

    function ClientService($q, $http, $rootScope, $resource, BASE_URL) {
    	var vm = this;

        this.getAllClients = function(data) {
        	return $resource(BASE_URL+'/clients', data);
        };

        this.getClient = function(id) {
            return $resource(BASE_URL+'/clients/'+id);
        }

        this.getClientImage = function(id) {
            return $resource(BASE_URL+'/clients/'+id+'/images');
        }

        this.getClientCharges = function(id) {
            return $resource(BASE_URL+'/clients/'+id+'/charges?pendingPayment=true');
        }

        this.getClientAccounts = function(id) {
            return $resource(BASE_URL+'/clients/'+id+'/accounts');
        }

    }

})();