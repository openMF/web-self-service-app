(function(){
    'use strict';

    angular.module('selfService')
        .controller('ChargesCtrl', ['$scope', '$rootScope', '$stateParams', 'AccountService', 'ChargesService', ChargesCtrl]);

    function ChargesCtrl($scope, $rootScope, $stateParams, AccountService, ChargesService) {

        var vm = this;
        vm.loadingCharges = true;
        vm.charges = {};
        vm.onPaginate = onPaginate;
        vm.page = 1;
        vm.query = {
            limit: 5,
            offset: 0
        }

        vm.getCharges = getCharges(vm.query);

        function getCharges(query){
            AccountService.getClientId().then(function (clientId){
                ChargesService.getClientCharges(clientId).get(query).$promise.then(function (res) {
                    vm.loadingCharges = false;
                    vm.charges = res;
                });
            });
        }

        function onPaginate(offset,limit) {
            getCharges(angular.extend({}, vm.query, {offset: (offset - 1) * limit, limit: limit}));
        }

    }
})();