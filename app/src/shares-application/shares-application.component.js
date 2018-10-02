(function(){
    'use strict';

    angular.module('selfService')
        .controller('SharesApplicationCtrl', ['$scope', '$filter', '$mdToast', 'AccountService', 'SharesApplicationService', SharesApplicationCtrl]);

    /**
     * @module SharesApplicationCtrl
     * @description
     * Controls Application for Shares
     */
    function SharesApplicationCtrl($scope) {
        var vm = this;

        vm.clearForm = clearForm;
        vm.submit = submit;
        vm.form = {};

        function clearForm() {
            $scope.shareApplicationForm.$setPristine();
            $scope.shareApplicationForm.$setUntouched();
            vm.form = {};
        }

        function submit() {

        }

    }
})();