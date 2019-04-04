(function () {
    'use strict';

    angular.module('selfService')
        .controller('ProfileViewCtrl', ['$state', '$stateParams', '$filter', 'navService', 'AccountService', ProfileViewCtrl]);

    function ProfileViewCtrl($state, $stateParams, $filter, navService, AccountService) {

        var vm = this;

        vm.profileImage = null;
        vm.profile = getUserData();
        vm.profileAddress = 'N/A';

        function getClient(clientId) {
            AccountService.getClient(clientId).get().$promise.then(function (data) {
                vm.profile = data;
            })
        }

        function getClientImage(clientId) {
            AccountService.getClientImage(clientId).then(function (resp) {
                vm.profileImage = resp.data;
            }).catch(function () {
                // Not Found Profile image
                vm.profileImage = 'assets/images/ic_person_black_24px.svg';
            });
        }

        function getUserData() {
            AccountService.getClientId().then(function (clientId) {
                vm.clientId = clientId;
                getClient(clientId);
                getClientImage(clientId);
            });
        }
    }

})();