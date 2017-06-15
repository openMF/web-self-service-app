(function () {
    'use strict';

    angular.module('selfService')
        .controller('ClientViewCtr', ['$scope', '$http', 'BASE_URL', '$rootScope', '$stateParams', 'ClientService', ClientViewCtr]);

    function ClientViewCtr($scope, $http, BASE_URL, $rootScope, $stateParams, ClientService) {

        var vm = this;
        vm.loadingAccountInfo = true;

        getClient($stateParams.clientId);
        getClientCharges($stateParams.clientId);
        getClientAccounts($stateParams.clientId);

        function getClient(id) {
            ClientService.getClient(id).get().$promise.then(function (res) {
                vm.client = res;
            });
            $http({
                method: 'GET',
                url: BASE_URL + '/self/clients/' + id + '/images?maxHeight=150'
            }).then(function (imageData) {
                vm.client.imageURL = imageData.data;
            });
        }

        function getClientCharges(id) {
            ClientService.getClientCharges(id).get().$promise.then(function (res) {
                vm.charges = res.pageItems;
            });
        }

        function getClientAccounts(id) {
            ClientService.getClientAccounts(id).get().$promise.then(function (res) {
                vm.loanAccounts = res.loanAccounts;
                vm.savingsAccounts = res.savingsAccounts;
                vm.loadingAccountInfo = false;
            });
        }
    }
})();