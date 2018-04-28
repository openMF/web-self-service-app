(function(){
    'use strict';

    angular.module('selfService')
        .controller('RecentTransactionCtrl', ['$scope', '$rootScope', '$stateParams', 'AccountService', 'TransactionService', RecentTransactionCtrl]);

    function RecentTransactionCtrl($scope, $rootScope, $stateParams, AccountService, TransactionService) {

        var vm = this;
        vm.loadingTransactions 	= true;
        vm.recenttransactions = {};
        vm.onPaginate = onPaginate;
        vm.page = 1;
        vm.query = {
            limit: 5,
            offset: 0
        }

        vm.getTransactions = getTransactions(vm.query);

        function getTransactions(query){
            AccountService.getClientId().then(function (clientId){
                TransactionService.getClientTransactions(clientId).get(query).$promise.then(function (res) {
                    vm.loadingTransactions = false;
                    vm.recenttransactions = res;
                });
            });
        }

        function onPaginate(offset,limit) {
            getTransactions(angular.extend({}, vm.query, {offset: (offset - 1) * limit, limit: limit}));
        }

    }
})();