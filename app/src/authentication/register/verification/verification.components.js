(function () {
    'use strict';

    angular.module('selfService')
        .controller('VerificationCtrl', ['$scope', '$state', '$mdToast', 'AuthService', '$location',  VerificationCtrl]);


    function VerificationCtrl($scope, $state, $mdToast, AuthService, $location) {
        var vm = this;
        vm.verifyData = {};

      /*  function clearForm() {
            $scope.form.$setPristine();
            $scope.form.$setUntouched();
            vm.verifyData={};

        }*/

        $scope.submit = function() {
            AuthService.verifyUser(vm.verifyData).then(function () {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('User has been successfully registered')
                        .position('top right')
                );
                $location.path('/login');
                vm.clearForm();
            }, function (resp) {
                var errors = '';
                if(resp.data){
                    errors = resp.data.errors.map(function (data) {
                        return data.defaultUserMessage;
                    });
                    errors.join(' ');
                }
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Error in creating user: ' + errors)
                        .position('top right')
                );

            });

        }

    }

})();
