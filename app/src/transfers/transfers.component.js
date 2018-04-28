(function () {
    'use strict';

    angular.module('selfService')
        .controller('AccountTransferCtrl', ['$scope', '$stateParams', '$filter', '$mdDialog', '$mdDateLocale', '$mdToast', 'AccountTransferService', AccountTransferCtrl]);

    /**
     * @module AccountTransferCtrl
     * @description
     * Account Transfer Controller
     */
    function AccountTransferCtrl($scope, $stateParams, $filter, $mdDialog, $mdDateLocale, $mdToast, AccountTransferService) {

        var vm = this;
        vm.fromAccountOptions = [];
        vm.toAccountOptions = [];
        vm.transferFormData = getTransferFormDataObj()

        vm.disabledToAccount = false;
        vm.disabledfromAccount = false;

        vm.transferFormData = getTransferFormDataObj();
        vm.getTransferTemplate = getTransferTemplate();
        vm.clearForm = clearForm;
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

                if($stateParams.toAccount) {
                    var i = 0;
                    for(i=0; i < vm.toAccountOptions.length; i++) {
                        if(vm.toAccountOptions[i].accountNo == $stateParams.toAccount.accountNo) {
                            vm.transferFormData.toAccount = vm.toAccountOptions[i];
                            vm.disabledToAccount = true;
                            break;
                        }
                    }
                }

                if($stateParams.fromAccount) {
                    for(i=0; i < vm.fromAccountOptions.length; i++) {
                        if(vm.fromAccountOptions[i].accountNo == $stateParams.fromAccount.accountNo) {
                            vm.transferFormData.fromAccount = vm.fromAccountOptions[i];
                            vm.disabledfromAccount = true;
                            break;
                        }
                    }
                }

            });
        }

        function clearForm() {
            vm.transferFormData = getTransferFormDataObj();
            $scope.transferForm.$setPristine();
            $scope.transferForm.$setUntouched();
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