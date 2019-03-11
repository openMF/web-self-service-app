(function () {
    'use strict';

    angular.module('selfService')
        .controller('AccountCtrl', ['$scope', '$rootScope', '$state', 'AccountService', 'AuthService', AccountCtrl]);

    function AccountCtrl($scope, $rootScope, $state, AccountService, AuthService) {

        var vm = this;
        vm.selected = [];
        vm.getAccounts = getAccounts;
        vm.onPaginate = onPaginate;
        vm.onReorder = onReorder;
        vm.routeTo = routeTo;
        vm.userData = AuthService.getUser();
        vm.clientId = getClient();//@todo check if this is behind the 2 calls
        vm.accounts = [];
        vm.loanAccounts = [];
        vm.savingsAccounts = [];
        vm.shareAccounts = [];
        vm.loadingAccountInfo = true;
        vm.tabIndex = sessionStorage.getItem("tab");

        vm.query = {
            limit: 5,
            offset: 1
        };

        function getClient() {
            AccountService.getClientId().then(function (clientId) {
                vm.clientId = clientId;
                getAccounts(clientId);
            });
        }

        function getAccounts(accountNo) {
            AccountService.getAllAccounts(accountNo).get().$promise.then(function (res) {
                vm.loanAccounts = res.loanAccounts;
                vm.savingsAccounts = res.savingsAccounts;
                vm.shareAccounts = res.shareAccounts;
                vm.loadingAccountInfo = false;
            });
        }

        function onPaginate(offset, limit) {
            getAccounts(angular.extend({}, vm.query, {offset: offset, limit: limit}));
        }

        function onReorder(order) {
            getAccounts(angular.extend({}, vm.query, {order: order}));
        }

        function routeTo(accountType, id) {
            var routingSlug = 'viewloanaccount';
            if ('savings' == accountType) {
                routingSlug = 'viewsavingsaccount';
                sessionStorage.setItem("tab", "1");
            } else if ('loan' == accountType) {
                routingSlug = 'viewloanaccount';
                sessionStorage.setItem("tab", "0");
            } else {
                routingSlug = 'viewshareaccount';
                sessionStorage.setItem("tab", "2");
            }
            $state.go('app.'+routingSlug, {id: id});
        }

    }

})();
