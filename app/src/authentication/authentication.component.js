(function () {
    'use strict';

    angular.module('selfService')
        .controller('LoginCtrl', ['$scope', '$rootScope', '$state', '$mdToast', 'AUTH_EVENTS', 'AuthService', 'AccountService', LoginCtrl]);

    function LoginCtrl($scope, $rootScope, $state, $mdToast, AUTH_EVENTS, AuthService, AccountService) {

        $scope.doLogin = function () {
            AuthService.doLogin($scope.loginData).save().$promise.then(function (result) {
                AuthService.setUser(result);
                AccountService.getClients().get().$promise
                    .then(function (res) {
                        if (res.pageItems.length !== 0) {
                            AccountService.setClientId(res.pageItems[0].id);
                            $mdToast.show(
                                $mdToast.simple()
                                    .content("Successful Login")
                                    .hideDelay(2000)
                                    .position('top right')
                            );
                            $state.go("app.accounts");
                        } else {
                            $mdToast.show(
                                $mdToast.simple()
                                    .content("No Clients Found")
                                    .hideDelay(2000)
                                    .position('top right')
                            );
                            AuthService.logout();
                        }
                    })
                    .catch(function () {
                        $mdToast.show(
                            $mdToast.simple()
                                .content("Not a Self Service User")
                                .hideDelay(2000)
                                .position('top right')
                        );
                        AuthService.logout();
                    })
            });
        }

    }

})();
