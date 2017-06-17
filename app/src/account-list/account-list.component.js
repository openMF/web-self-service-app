(function () {
    'use strict';

    angular.module('selfService')
        .controller('AccountCtrl', ['$scope', '$rootScope', '$location', 'AccountService', 'AuthService', AccountCtrl]);

    function AccountCtrl($scope, $rootScope, $location, AccountService, AuthService) {

        var vm = this;
        vm.selected = [];
        vm.getAccounts = getAccounts;
        vm.onPaginate = onPaginate;
        vm.onReorder = onReorder;
        vm.routeTo = routeTo;
        vm.userData = AuthService.getUser();
        vm.clients = getClients();//@todo check if this is behind the 2 calls
        vm.accounts = [];
        vm.loanAccounts = [];
        vm.savingsAccounts = [];
        vm.shareAccounts = [];
        vm.loadingAccountInfo = true;

        vm.query = {
            limit: 5,
            offset: 1
        };

        function getClients() {
            AccountService.getClients().get().$promise.then(function (res) {
                vm.clients = res;
                getAccounts(res.pageItems[0].id);
            })
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
            } else if ('loan' == accountType) {
                routingSlug = 'viewloanaccount';
            } else {
                routingSlug = 'viewshareaccount';
            }
            $location.path('/app/' + routingSlug + '/' + id);
        }

        function routeTo(accountType, id) {
            var routingSlug = 'viewloanaccount';
            if ('savings' == accountType) {
                routingSlug = 'viewsavingsaccount';
            } else if ('loan' == accountType) {
                routingSlug = 'viewloanaccount';
            } else {
                routingSlug = 'viewshareaccount';
            }
            $location.path('/app/' + routingSlug + '/' + id);
        }

    }

})();
