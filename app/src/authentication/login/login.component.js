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
            console.log('Login attempt with data:', $scope.loginData);
            vm.authenticating = true;
            AuthService.doLogin().save($scope.loginData).$promise
                .then(function (result) {
                    console.log('Login response:', result);
                    AuthService.setUser(result);
                    AccountService.getClients().get().$promise
                        .then(function (res) {
                            console.log('Client data:', res);
                            vm.authenticating = false;
                            $state.go("app.dashboard");
                            if (res.pageItems.length !== 0) {
                                console.log('Selected client ID:', res.pageItems[0].id);
                                AccountService.setClientId(res.pageItems[0].id);
                                $mdToast.show(
                                    $mdToast.simple()
                                        .content("Successful Login")
                                        .hideDelay(2000)
                                        .position('top right')
                                );
                
                            } else {
                                console.log('No clients found for user');
                                $mdToast.show(
                                    $mdToast.simple()
                                        .content("No Clients Found")
                                        .hideDelay(2000)
                                        .position('top right')
                                );
                                AuthService.logout();
                            }
                        })
                        .catch(function (error) {
                            console.error('Client fetch error:', error);
                            vm.authenticating = false;
                            $mdToast.show(
                                $mdToast.simple()
                                    .content("Not a Self Service User")
                                    .hideDelay(2000)
                                    .position('top right')
                            );
                            AuthService.logout();
                        })
                }).catch(function (error) {
                    console.error('Login error:', error);
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
