(function () {
    'use strict';

    angular.module('selfService')
        .controller('LoginCtrl', ['$scope', '$rootScope', '$state', '$mdToast', 'AUTH_EVENTS', 'AuthService', 'AccountService', LoginCtrl]);

    function LoginCtrl($scope, $rootScope, $state, $mdToast, AUTH_EVENTS, AuthService, AccountService) {

        var vm = this;
        vm.authenticating = false;

        /**
         * @method doLogin
         * @description To perform the login action on the page
         */
        $scope.doLogin = function () {
            vm.authenticating = true;
            AuthService.doLogin($scope.loginData).save().$promise
                .then(function (result) {
                    AuthService.setUser(result);
                    AccountService.getClients().get().$promise
                        .then(function (res) {
                            vm.authenticating = false;
                            if (res.pageItems.length !== 0) {
                                AccountService.setClientId(res.pageItems[0].id);
                                $mdToast.show(
                                    $mdToast.simple()
                                        .content("Successful Login")
                                        .hideDelay(2000)
                                        .position('top right')
                                );
                                $state.go("app.dashboard");
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
                            vm.authenticating = false;
                            $mdToast.show(
                                $mdToast.simple()
                                    .content("Not a Self Service User")
                                    .hideDelay(2000)
                                    .position('top right')
                            );
                            AuthService.logout();
                        })
                }).catch(function () {
                    vm.authenticating = false;
                    $mdToast.show(
                        $mdToast.simple()
                            .content("Invalid Login Credentials")
                            .hideDelay(2000)
                            .position('top right')
                    );
                })
        }

    }

})();
