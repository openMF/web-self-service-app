(function(){
    'use strict';

    angular.module('selfService')
        .controller('SavingsApplicationCtrl', ['$scope', '$filter', '$mdToast', 'AccountService', 'SavingsApplicationService', SavingsApplicationCtrl]);

    /**
     * @module SavingsApplicationCtrl
     * @description
     * Controls Application for Savings
     */
    function SavingsApplicationCtrl($scope) {
        var vm = this;
        vm.form = {};

        vm.clearForm = clearForm;
        vm.submit = submit;
        vm.form = {};

        function clearForm() {
            $scope.savingsApplicationForm.$setPristine();
            $scope.savingsApplicationForm.$setUntouched();
            vm.form = {};
        }

        function submit() {

        }
    }
})();