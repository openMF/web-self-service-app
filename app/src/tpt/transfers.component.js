(function () {
    'use strict';

    angular.module('selfService')
        .controller('AccountTransferCtrl', ['$scope', '$rootScope', '$stateParams', '$filter', '$mdDialog', '$mdDateLocale', '$mdToast', 'AccountService', 'AccountTransferService', AccountTransferCtrl]);

    function AccountTransferCtrl($scope, $rootScope, $stateParams, $filter, $mdDialog, $mdDateLocale, $mdToast, AccountService, AccountTransferService) {

        var vm = this;
        vm.fromAccountOptions = [];
        vm.toAccountOptions = [];
        vm.transferFormData = getTransferFormDataObj()

        vm.getTransferTemplate = getTransferTemplate();
        vm.submit = submit;

        // FORMAT THE DATE FOR THE DATEPICKER
        $mdDateLocale.formatDate = function (date) {
            return $filter('date')(date, "dd-MM-yyyy");
        };

        function getTransferFormDataObj() {
            return {
                transferDate: new Date()
            };
        }

        function getTransferTemplate() {
            AccountTransferService.getTransferTemplate().get(function (data) {
                vm.fromAccountOptions = data.fromAccountOptions;
                vm.toAccountOptions = data.toAccountOptions;
            });
        }

        function clearForm() {
            $scope.transferForm.$setPristine();
            vm.transferFormData = getTransferFormDataObj();
        }

        function submit(ev) {
            $mdDialog.show({
                controller: 'ReviewTransferDialogCtrl',
                controllerAs: 'vm',
                templateUrl: 'src/transfers/review-transfer-dialog/review-transfer-dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                locals: {transferFormData: vm.transferFormData},
                clickOutsideToClose: true
            }).then(function (result) {
                if(result === "success"){
                    clearForm();
                }
            }, function () {
                clearForm();
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Transfer Cancelled')
                        .position('top right')
                );
            });
        }


    }
})();