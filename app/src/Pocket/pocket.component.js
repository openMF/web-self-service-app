(function () {
    'use strict';

    angular.module('selfService')
        .controller('PocketCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$location', PocketCtrl]);

    function PocketCtrl($scope, $rootScope, $state, $stateParams, $location) {

        var vm = this;
        vm.accountType;
        vm.client = JSON.parse(sessionStorage.getItem('user_profile')).userId;
        vm.pocket = JSON.parse(localStorage.getItem('pocket'));

        vm.check_userID = check_userID(vm.client);
        vm.getAccountType = getAccountType;
        vm.routeTo = routeTo;


        function check_userID(current_userId) {
            if(current_userId!=vm.pocket.userId){
                window.localStorage.removeItem('pocket');
                vm.pocket = new Object();
                vm.pocket.accounts=[];
                vm.pocket.userId=vm.client;
            }
        }

        function getAccountType(item) {
                if(item.type==null){
                    vm.accountType='Loan';
                    return vm.accountType;
                }
                else{
                    vm.accountType = (item.type);

                    return vm.accountType;
                }
            }

         function routeTo(account) {
            var id = account.id;
            if(account.depositType==undefined){
                $location.path('/viewloanaccount/' + id);
            }
            else{
                $location.path('/viewsavingsaccount/' + id);
            }
         }
    }
})();